import { uploadFiles } from "./uploadFiles";
import { calculateChanges } from "./calculateChanges";
import { getSourceFiles } from "./getSourceFiles";
import { StorageService } from "./StorageService";
import { DeploymentFile } from "./index";

const deploymentLogFileName = "deployment.json";

type DeployAssetsParams = {
  sourceDir: string;
  hostingConfig: any;
  storageService: StorageService;
  maxDays: number;
};

export async function deployAssets({ sourceDir, hostingConfig, storageService, maxDays }: DeployAssetsParams): Promise<void> {
  const files = await getSourceFiles({ sourceDir: sourceDir });

  console.debug("files to upload", files);
  await uploadFiles({ files, storageService, hostingConfig });

  console.log("Getting previous deployment log...");
  const lastDeploymentLog = (await storageService.downloadFile(deploymentLogFileName)) as DeploymentFile[] | null;

  if (lastDeploymentLog) {
    console.log("Previous deployment log:", lastDeploymentLog);
  } else {
    console.log("No previous deployment log found.");
  }

  const { filesToDelete, newDeploymentLog } = calculateChanges({
    lastDeploymentLog: lastDeploymentLog ?? [],
    files,
    maxDays,
  });

  console.log("Uploading new deployment log...", newDeploymentLog);
  await storageService.uploadFile({ name: deploymentLogFileName, body: JSON.stringify(newDeploymentLog) });
  console.log("New deployment log was uploaded", newDeploymentLog);

  if (filesToDelete.length > 0) {
    console.log(`Deleting ${filesToDelete.length} expired files...`);
    await storageService.deleteFiles(filesToDelete);
    console.log("Expired files were deleted");
  } else {
    console.log("No expired files to delete");
  }
}

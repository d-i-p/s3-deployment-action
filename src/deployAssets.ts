import { uploadFiles } from "./uploadFiles";
import { calculateChanges } from "./calculateChanges";
import { getSourceFiles } from "./getSourceFiles";
import { StorageService } from "./StorageService";
import { DeploymentFile } from "./action";

const deploymentLogFileName = "deployment.json";

type DeployAssetsParams = {
  sourceDir: string;
  hostingConfig: any;
  storageService: StorageService;
  maxDays: number;
};

export async function deployAssets({
  sourceDir,
  hostingConfig,
  storageService,
  maxDays,
}: DeployAssetsParams): Promise<void> {
  const files = await getSourceFiles({ sourceDir });

  console.log("Files to upload", files);
  await uploadFiles({ files, sourceDir, storageService, hostingConfig });

  console.log("Getting last deployment log...");
  const lastDeploymentLogFileContents = await storageService.downloadFileAsString(deploymentLogFileName);
  const lastDeploymentLog =
    lastDeploymentLogFileContents !== null ? (JSON.parse(lastDeploymentLogFileContents) as DeploymentFile[]) : null;

  if (lastDeploymentLog) {
    console.log("Last deployment log:", lastDeploymentLog);
  } else {
    console.log("Lastdeployment log not found.");
  }

  const { filesToDelete, newDeploymentLog } = calculateChanges({
    lastDeploymentLog: lastDeploymentLog ?? [],
    files,
    maxDays,
  });

  console.log("Created new deployment log", newDeploymentLog);
  await storageService.uploadFile({ key: deploymentLogFileName, body: JSON.stringify(newDeploymentLog) });

  if (filesToDelete.length > 0) {
    console.log(`Deleting ${filesToDelete.length} expired files...`);
    await storageService.deleteFiles(filesToDelete);
    console.log("Expired files were deleted");
  } else {
    console.log("No expired files to delete");
  }
}

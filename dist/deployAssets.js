import { uploadFiles } from "./uploadFiles";
import { calculateChanges } from "./calculateChanges";
import { getSourceFiles } from "./getSourceFiles";
const deploymentLogFileName = "deployment.json";
export async function deployAssets({ sourceDir, hostingConfig, storageService, maxDays }) {
    const files = await getSourceFiles({ sourceDir });
    console.log("Files to upload", files);
    await uploadFiles({ files, storageService, hostingConfig });
    console.log("Getting last deployment log...");
    const lastDeploymentLog = (await storageService.downloadFile(deploymentLogFileName));
    if (lastDeploymentLog) {
        console.log("Last deployment log:", lastDeploymentLog);
    }
    else {
        console.log("Lastdeployment log not found.");
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
    }
    else {
        console.log("No expired files to delete");
    }
}

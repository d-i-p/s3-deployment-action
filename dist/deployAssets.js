"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployAssets = void 0;
const uploadFiles_1 = require("./uploadFiles");
const calculateChanges_1 = require("./calculateChanges");
const getSourceFiles_1 = require("./getSourceFiles");
const deploymentLogFileName = "deployment.json";
async function deployAssets({ sourceDir, hostingConfig, storageService, maxDays, }) {
    const files = await (0, getSourceFiles_1.getSourceFiles)({ sourceDir });
    console.log("Files to upload", files);
    await (0, uploadFiles_1.uploadFiles)({ files, storageService, hostingConfig });
    console.log("Getting last deployment log...");
    const lastDeploymentLogFileContents = await storageService.downloadFileAsString(deploymentLogFileName);
    const lastDeploymentLog = lastDeploymentLogFileContents !== null ? JSON.parse(lastDeploymentLogFileContents) : null;
    if (lastDeploymentLog) {
        console.log("Last deployment log:", lastDeploymentLog);
    }
    else {
        console.log("Lastdeployment log not found.");
    }
    const { filesToDelete, newDeploymentLog } = (0, calculateChanges_1.calculateChanges)({
        lastDeploymentLog: lastDeploymentLog !== null && lastDeploymentLog !== void 0 ? lastDeploymentLog : [],
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
exports.deployAssets = deployAssets;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = __importDefault(require("@actions/core"));
const client_s3_1 = require("@aws-sdk/client-s3");
const fs_1 = require("fs");
const promises_1 = require("fs/promises");
const deployAssets_1 = require("./deployAssets");
const StorageService_1 = require("./StorageService");
async function main() {
    const { accessKeyId, secretAccessKey, sourceDir, bucket, region, maxDays } = getActionParams();
    const s3Client = new client_s3_1.S3Client({
        region: region,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });
    const storageService = (0, StorageService_1.createS3StorageService)({
        s3Client,
        bucket,
    });
    const hostingConfig = await readHostingConfig();
    await (0, deployAssets_1.deployAssets)({ storageService, sourceDir, hostingConfig, maxDays });
}
const fileExists = (file) => (0, promises_1.access)(file, fs_1.constants.R_OK)
    .catch(() => false)
    .then(() => true);
async function readHostingConfig() {
    const hostingFileName = "hosting.json";
    if (!(await fileExists(hostingFileName))) {
        throw new Error(`${hostingFileName} must be created`);
    }
    const hostingFileContent = await (0, promises_1.readFile)(hostingFileName);
    const hostingConfig = JSON.parse(hostingFileContent.toString());
    return hostingConfig;
}
function getActionParams() {
    return {
        accessKeyId: core_1.default.getInput("access-key-id", {
            required: true,
        }),
        secretAccessKey: core_1.default.getInput("secret-access-key", {
            required: true,
        }),
        region: core_1.default.getInput("region", {
            required: true,
        }),
        bucket: core_1.default.getInput("bucket", {
            required: true,
        }),
        sourceDir: core_1.default.getInput("source-dir", {
            required: true,
        }),
        maxDays: parseInt(core_1.default.getInput("max-days", {
            required: false,
        })),
    };
}
main().catch((error) => {
    core_1.default.setFailed(error.message);
});

import core from "@actions/core";
import { S3Client } from "@aws-sdk/client-s3";
import { deployAssets } from "./deployAssets";
import { createS3StorageService } from "./StorageService";
const { accessKeyId, secretAccessKey, sourceDir, bucket, maxDays } = getActionParams();
const hostingConfig = null; // TODO
const s3Client = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
    region: "eu-west-1",
});
const storageService = createS3StorageService({ s3Client, bucket });
await deployAssets({ storageService, sourceDir, hostingConfig, maxDays });
function getActionParams() {
    return {
        accessKeyId: core.getInput("awsKeyId", {
            required: true,
        }),
        secretAccessKey: core.getInput("awsSecretAccessKey", {
            required: true,
        }),
        bucket: core.getInput("bucket", {
            required: true,
        }),
        sourceDir: core.getInput("sourceDir", {
            required: true,
        }),
        maxDays: parseInt(core.getInput("maxDays", {
            required: true,
        })),
    };
}

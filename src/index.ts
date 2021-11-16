import core from "@actions/core";
import { S3Client } from "@aws-sdk/client-s3";
import { deployAssets } from "./deployAssets";
import { createS3StorageService } from "./StorageService";

const { accessKeyId, secretAccessKey, sourceDir, bucket, region, maxDays } = getActionParams();

const hostingConfig: HostingConfig = null as any; // TODO

const s3Client = new S3Client({
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
  region,
});

const storageService = createS3StorageService({ s3Client, bucket });

await deployAssets({ storageService, sourceDir, hostingConfig, maxDays });

export type FileConfig = {
  path: string;
  headers: {
    key: string;
    value: string;
  }[];
};

export type HostingConfig = {
  sourceDirectory: string;
  files: FileConfig[];
};

export type DeploymentFile = { path: string; obsoleteSince: string | null };

function getActionParams() {
  return {
    accessKeyId: core.getInput("awsKeyId", {
      required: true,
    }),
    secretAccessKey: core.getInput("awsSecretAccessKey", {
      required: true,
    }),
    region: core.getInput("region", {
      required: true,
    }),
    bucket: core.getInput("bucket", {
      required: true,
    }),
    sourceDir: core.getInput("sourceDir", {
      required: true,
    }),
    maxDays: parseInt(
      core.getInput("maxDays", {
        required: true,
      })
    ),
  };
}

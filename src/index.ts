import core from "@actions/core";
import { S3Client } from "@aws-sdk/client-s3";
import { constants } from "fs";
import { access, readFile } from "fs/promises";
import { deployAssets } from "./deployAssets";
import { createS3StorageService } from "./StorageService";

async function main() {
  const { accessKeyId, secretAccessKey, sourceDir, bucket, region, maxDays } = getActionParams();
  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
  const storageService = createS3StorageService({
    s3Client,
    bucket,
  });
  const hostingConfig = await readHostingConfig();
  await deployAssets({ storageService, sourceDir, hostingConfig, maxDays });
}

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

export type DeploymentFile = {
  path: string;
  obsoleteSince: string | null;
};

const fileExists = (file: string) =>
  access(file, constants.R_OK)
    .catch(() => false)
    .then(() => true);

async function readHostingConfig(): Promise<HostingConfig> {
  const hostingFileName = "hosting.json";

  if (!(await fileExists(hostingFileName))) {
    throw new Error(`${hostingFileName} must be created`);
  }

  const hostingFileContent = await readFile(hostingFileName);
  const hostingConfig: HostingConfig = JSON.parse(hostingFileContent.toString());
  return hostingConfig;
}

function getActionParams() {
  return {
    accessKeyId: core.getInput("access-key-id", {
      required: true,
    }),
    secretAccessKey: core.getInput("secret-access-key", {
      required: true,
    }),
    region: core.getInput("region", {
      required: true,
    }),
    bucket: core.getInput("bucket", {
      required: true,
    }),
    sourceDir: core.getInput("source-dir", {
      required: true,
    }),
    maxDays: parseInt(
      core.getInput("max-days", {
        required: false,
      })
    ),
  };
}

main().catch((error) => {
  core.setFailed(error.message);
});

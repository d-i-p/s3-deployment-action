import { S3Client } from "@aws-sdk/client-s3";
import { getActionParams } from ".";
import { deployAssets } from "./deployAssets";
import { createS3StorageService } from "./StorageService";
import { constants } from "fs";
import { promises as fs } from "fs";

export async function action({ sourceDir, bucket, maxDays }: ReturnType<typeof getActionParams>) {
  const s3Client = new S3Client({});
  const storageService = createS3StorageService({
    s3Client,
    bucket,
  });
  const hostingConfig = (await readHostingConfig()) ?? { files: [] };
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
  files: FileConfig[];
};

export type DeploymentFile = {
  path: string;
  obsoleteSince: string | null;
};

const fileExists = (file: string) =>
  fs
    .access(file, constants.R_OK)
    .then(() => true)
    .catch(() => false);

async function readHostingConfig(): Promise<HostingConfig | null> {
  const hostingFileName = "hosting.json";

  if (!(await fileExists(hostingFileName))) {
    return null;
  }

  const hostingFileContent = await fs.readFile(hostingFileName);
  const hostingConfig: HostingConfig = JSON.parse(hostingFileContent.toString());
  return hostingConfig;
}

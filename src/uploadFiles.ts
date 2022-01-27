import { promises as fs } from "fs";
import path from "path";
import { FileConfig, HostingConfig } from "./action";
import { StorageService } from "./StorageService";

type UploadFilesParams = {
  /**
   * Paths, relative to the project, NOT the folder being deployed.
   */
  files: string[];
  /**
   * Path to the folder being deployed.
   */
  sourceDir: string;
  storageService: StorageService;
  hostingConfig: HostingConfig;
};

export async function uploadFiles({ files, sourceDir, storageService, hostingConfig }: UploadFilesParams) {
  const fileInfos = files.map((file) => ({
    config: hostingConfig.files.find((x) => x.path === path.relative(sourceDir, file)),
    file,
  }));

  async function uploadFile({ file, config }: { file: string; config: FileConfig | undefined }) {
    const key = path.relative(sourceDir, file);
    await storageService.uploadFile({
      key,
      body: await fs.readFile(file),
      ...(config ? getS3ObjectParams(config.headers) : {}),
    });
  }

  const nonEntrypoints = fileInfos.filter(({ config }) => !config?.isEntrypoint);
  await Promise.all(nonEntrypoints.map(uploadFile));

  const entrypoints = fileInfos.filter(({ config }) => config?.isEntrypoint);
  await Promise.all(entrypoints.map(uploadFile));
}

function getS3ObjectParams(headers: FileConfig["headers"]) {
  const standardHeaders = ["cache-control", "access-control-allow-origin"]; // we discard "access-control-allow-origin" as it should be set in Cloudfront

  const CacheControl = headers.find((x) => x.key.toLowerCase() === "cache-control")?.value;

  const Metadata = Object.fromEntries(
    headers.filter((x) => !standardHeaders.includes(x.key.toLowerCase())).map((x) => [`header-${x.key}`, x.value])
  );

  return {
    CacheControl,
    Metadata,
  };
}

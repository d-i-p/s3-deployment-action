import { promises as fs } from "fs";
import path from "path";
import { FileConfig, HostingConfig } from "./action";
import { StorageService } from "./StorageService";

export const entryPointFileNames = ["index.html", "index.htm", "manifest.json", "asset-manifest.json"];

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
    isEntrypoint: entryPointFileNames.includes(path.basename(file)),
    file,
  }));

  async function uploadFile(file: string) {
    const key = path.relative(sourceDir, file);
    const fileConfig = hostingConfig.files.find((x) => x.path === key);
    await storageService.uploadFile({
      key,
      body: await fs.readFile(file),
      ...(fileConfig ? getS3ObjectParams(fileConfig.headers) : {}),
    });
  }

  const nonEntrypoints = fileInfos.filter(({ isEntrypoint }) => !isEntrypoint).map(({ file }) => file);
  await Promise.all(nonEntrypoints.map(uploadFile));

  const entrypoints = fileInfos.filter(({ isEntrypoint }) => isEntrypoint).map(({ file }) => file);
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

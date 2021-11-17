import { deployAssets } from "./deployAssets";
import { StorageService } from "./StorageService";
import * as getSourceFilesModule from "./getSourceFiles";
import { promises as fs } from "fs";
import temp from "temp";
import path from "path";
import { HostingConfig } from "./action";

const trackingTemp = temp.track();

describe(deployAssets, () => {
  const hostingConfig: HostingConfig = {
    files: [
      {
        path: "index.html",
        headers: [
          {
            key: "Cache-Control",
            value: "max-age=3600",
          },
          {
            key: "Other-Header",
            value: "123value",
          },
        ],
      },
    ],
  };

  function createFakeStorageService(): StorageService {
    const storage = new Map<string, StoredFile>();
    return {
      deleteFiles: jest.fn(async (keys: string[]) => keys.forEach((key) => storage.delete(key))),
      downloadFileAsString: jest.fn(async (key: string) => (storage.get(key)?.body as string) ?? null),
      uploadFile: jest.fn(async (file: StoredFile) => {
        storage.set(file.key, file);
      }),
    };
  }

  afterEach(() => {
    trackingTemp.cleanupSync();
  });

  it("should deploy the assets", async () => {
    const storageService = createFakeStorageService();
    jest.spyOn(fs, "readFile").mockResolvedValue("file content");

    const sourceDir = trackingTemp.mkdirSync();
    await Promise.all(
      ["index.html", "manifest.json", "images/cat.png", "images/dog.png"].map(async (file) => {
        const fullPath = path.join(sourceDir, file);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, "dummy content");
      })
    );
    await deployAssets({ maxDays: 6, hostingConfig, sourceDir, storageService });

    expect(storageService.uploadFile).toHaveBeenCalledTimes(5); // 4 assets + deployment.json
  });

  it("should deploy the assets", async () => {
    const storageService = createFakeStorageService();

    jest.spyOn(fs, "readFile").mockResolvedValue("file content");

    jest
      .spyOn(getSourceFilesModule, "getSourceFiles")
      .mockResolvedValueOnce(["index.html", "manifest.json", "images/cat.png", "images/dog.png"])
      .mockResolvedValueOnce(["index.html", "manifest.json", "images/cat.png"])
      .mockResolvedValueOnce(["index.html", "manifest.json", "images/cat.png", "images/saturn.png"]); // dog.png is no longer used, so it should be deleted after 6 days

    const deploymentParams = { maxDays: 6, hostingConfig, sourceDir: "./not-a-real-path", storageService };

    jest.spyOn(Date, "now").mockReturnValue(new Date(2020, 0, 1, 0, 0, 0).getTime());
    await deployAssets(deploymentParams);
    expect(storageService.deleteFiles).toHaveBeenCalledTimes(0);

    jest.spyOn(Date, "now").mockReturnValue(new Date(2020, 0, 4, 0, 0, 0).getTime()); // 13 days since "images/dog.png" was no longer used
    await deployAssets(deploymentParams);
    expect(storageService.deleteFiles).toHaveBeenCalledTimes(0);

    jest.spyOn(Date, "now").mockReturnValue(new Date(2020, 0, 13, 0, 0, 0).getTime()); // 13 days since "images/dog.png" was no longer used
    await deployAssets(deploymentParams);
    expect(storageService.deleteFiles).toHaveBeenCalledTimes(1);
  });
});

type StoredFile = {
  key: string;
  body: unknown;
  CacheControl?: string | undefined;
  Metadata?: { [k: string]: string } | undefined;
};

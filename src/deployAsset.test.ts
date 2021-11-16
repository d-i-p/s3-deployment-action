import { HostingConfig } from "./index";
import { deployAssets } from "./deployAssets";
import { StorageService } from "./StorageService";
import * as getSourceFilesModule from "./getSourceFiles";
import fs from "fs/promises";

describe(deployAssets, () => {
  it("should deploy the assets", async () => {
    type StoredFile = {
      name: string;
      body: unknown;
      CacheControl?: string | undefined;
      Metadata?: { [k: string]: string } | undefined;
    };
    const storage = new Map<string, StoredFile>();
    const storageService: StorageService = {
      deleteFiles: jest.fn(async (names: string[]) => names.forEach((name) => storage.delete(name))),
      downloadFile: jest.fn(async (name: string) => storage.get(name)?.body),
      uploadFile: jest.fn(async (file: StoredFile) => {
        storage.set(file.name, file);
      }),
    };

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
      sourceDirectory: "./build",
    };

    jest
      .spyOn(getSourceFilesModule, "getSourceFiles")
      .mockResolvedValue(["index.html", "manifest.json", "images/cat.png", "images/dog.png"]);

    jest.spyOn(fs, "readFile").mockResolvedValue("file content");

    await deployAssets({ maxDays: 6, hostingConfig, sourceDir: "./not-a-real-path", storageService });

    expect(storageService.uploadFile).toHaveBeenCalledTimes(5); // 4 assets + deployment.json
  });
});

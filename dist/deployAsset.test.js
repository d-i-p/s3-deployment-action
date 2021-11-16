import { deployAssets } from "./deployAssets";
import * as getSourceFilesModule from "./getSourceFiles";
import fs from "fs/promises";
describe(deployAssets, () => {
    it("should deploy the assets", async () => {
        const storage = new Map();
        const storageService = {
            deleteFiles: jest.fn(async (names) => names.forEach((name) => storage.delete(name))),
            downloadFile: jest.fn(async (name) => storage.get(name)?.body),
            uploadFile: jest.fn(async (file) => {
                storage.set(file.name, file);
            }),
        };
        const hostingConfig = {
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

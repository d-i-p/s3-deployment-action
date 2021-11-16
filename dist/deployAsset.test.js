import { deployAssets } from "./deployAssets";
import * as getSourceFilesModule from "./getSourceFiles";
import fs from "fs/promises";
describe(deployAssets, () => {
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
    const storage = new Map();
    const storageService = {
        deleteFiles: jest.fn(async (names) => names.forEach((name) => storage.delete(name))),
        downloadFile: jest.fn(async (name) => storage.get(name)?.body),
        uploadFile: jest.fn(async (file) => {
            storage.set(file.name, file);
        }),
    };
    beforeEach(() => {
        storage.clear();
    });
    it("should deploy the assets", async () => {
        jest.spyOn(fs, "readFile").mockResolvedValue("file content");
        jest
            .spyOn(getSourceFilesModule, "getSourceFiles")
            .mockResolvedValue(["index.html", "manifest.json", "images/cat.png", "images/dog.png"]);
        await deployAssets({ maxDays: 6, hostingConfig, sourceDir: "./not-a-real-path", storageService });
        expect(storageService.uploadFile).toHaveBeenCalledTimes(5); // 4 assets + deployment.json
    });
    it("should deploy the assets", async () => {
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

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deployAssets_1 = require("./deployAssets");
const getSourceFilesModule = __importStar(require("./getSourceFiles"));
const promises_1 = __importDefault(require("fs/promises"));
describe(deployAssets_1.deployAssets, () => {
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
        downloadFileAsString: jest.fn(async (name) => { var _a, _b; return (_b = (_a = storage.get(name)) === null || _a === void 0 ? void 0 : _a.body) !== null && _b !== void 0 ? _b : null; }),
        uploadFile: jest.fn(async (file) => {
            storage.set(file.name, file);
        }),
    };
    beforeEach(() => {
        storage.clear();
    });
    it("should deploy the assets", async () => {
        jest.spyOn(promises_1.default, "readFile").mockResolvedValue("file content");
        jest
            .spyOn(getSourceFilesModule, "getSourceFiles")
            .mockResolvedValue(["index.html", "manifest.json", "images/cat.png", "images/dog.png"]);
        await (0, deployAssets_1.deployAssets)({ maxDays: 6, hostingConfig, sourceDir: "./not-a-real-path", storageService });
        expect(storageService.uploadFile).toHaveBeenCalledTimes(5); // 4 assets + deployment.json
    });
    it("should deploy the assets", async () => {
        jest.spyOn(promises_1.default, "readFile").mockResolvedValue("file content");
        jest
            .spyOn(getSourceFilesModule, "getSourceFiles")
            .mockResolvedValueOnce(["index.html", "manifest.json", "images/cat.png", "images/dog.png"])
            .mockResolvedValueOnce(["index.html", "manifest.json", "images/cat.png"])
            .mockResolvedValueOnce(["index.html", "manifest.json", "images/cat.png", "images/saturn.png"]); // dog.png is no longer used, so it should be deleted after 6 days
        const deploymentParams = { maxDays: 6, hostingConfig, sourceDir: "./not-a-real-path", storageService };
        jest.spyOn(Date, "now").mockReturnValue(new Date(2020, 0, 1, 0, 0, 0).getTime());
        await (0, deployAssets_1.deployAssets)(deploymentParams);
        expect(storageService.deleteFiles).toHaveBeenCalledTimes(0);
        jest.spyOn(Date, "now").mockReturnValue(new Date(2020, 0, 4, 0, 0, 0).getTime()); // 13 days since "images/dog.png" was no longer used
        await (0, deployAssets_1.deployAssets)(deploymentParams);
        expect(storageService.deleteFiles).toHaveBeenCalledTimes(0);
        jest.spyOn(Date, "now").mockReturnValue(new Date(2020, 0, 13, 0, 0, 0).getTime()); // 13 days since "images/dog.png" was no longer used
        await (0, deployAssets_1.deployAssets)(deploymentParams);
        expect(storageService.deleteFiles).toHaveBeenCalledTimes(1);
    });
});

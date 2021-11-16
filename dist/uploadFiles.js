"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFiles = exports.entryPointFileNames = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
exports.entryPointFileNames = ["index.html", "index.htm", "manifest.json", "asset-manifest.json"];
async function uploadFiles({ files, storageService, hostingConfig }) {
    const fileInfos = files.map((file) => ({
        isEntrypoint: exports.entryPointFileNames.includes(path_1.default.basename(file)),
        file,
    }));
    async function uploadFile(file) {
        const fileConfig = hostingConfig.files.find((x) => x.path === file);
        await storageService.uploadFile(Object.assign({ name: file, body: await promises_1.default.readFile(file) }, (fileConfig ? getS3ObjectParams(fileConfig.headers) : {})));
    }
    const nonEntrypoints = fileInfos.filter(({ isEntrypoint }) => !isEntrypoint).map(({ file }) => file);
    await Promise.all(nonEntrypoints.map(uploadFile));
    const entrypoints = fileInfos.filter(({ isEntrypoint }) => isEntrypoint).map(({ file }) => file);
    await Promise.all(entrypoints.map(uploadFile));
}
exports.uploadFiles = uploadFiles;
function getS3ObjectParams(headers) {
    var _a;
    const standardHeaders = ["cache-control", "access-control-allow-origin"]; // we discard "access-control-allow-origin" as it should be set in Cloudfront
    const CacheControl = (_a = headers.find((x) => x.key.toLowerCase() === "cache-control")) === null || _a === void 0 ? void 0 : _a.value;
    const Metadata = Object.fromEntries(headers.filter((x) => !standardHeaders.includes(x.key.toLowerCase())).map((x) => [`header-${x.key}`, x.value]));
    return {
        CacheControl,
        Metadata,
    };
}

import fs from "fs";
import path from "path";
export const entryPointFileNames = ["index.html", "index.htm", "manifest.json", "asset-manifest.json"];
export async function uploadFiles({ files, storageService, hostingConfig }) {
    const fileInfos = files.map((file) => ({
        isEntrypoint: entryPointFileNames.includes(path.basename(file)),
        file,
    }));
    async function uploadFile(file) {
        const fileConfig = hostingConfig.files.find((x) => x.path === file);
        await storageService.uploadFile({
            name: file,
            body: fs.readFileSync(file),
            ...(fileConfig ? getS3ObjectParams(fileConfig.headers) : {}),
        });
    }
    const nonEntrypoints = fileInfos.filter(({ isEntrypoint }) => !isEntrypoint).map(({ file }) => file);
    await Promise.all(nonEntrypoints.map(uploadFile));
    const entrypoints = fileInfos.filter(({ isEntrypoint }) => isEntrypoint).map(({ file }) => file);
    await Promise.all(entrypoints.map(uploadFile));
}
function getS3ObjectParams(headers) {
    const standardHeaders = ["cache-control", "access-control-allow-origin"]; // we discard "access-control-allow-origin" completely as it is set through Terraform
    const CacheControl = headers.find((x) => x.key.toLowerCase() === "cache-control")?.value;
    const Metadata = Object.fromEntries(headers.filter((x) => !standardHeaders.includes(x.key.toLowerCase())).map((x) => [`header-${x.key}`, x.value]));
    return {
        CacheControl,
        Metadata,
    };
}

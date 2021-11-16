"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSourceFiles = void 0;
const glob_1 = __importDefault(require("@actions/glob"));
const path_1 = __importDefault(require("path"));
async function getSourceFiles({ sourceDir }) {
    const globber = await glob_1.default.create(path_1.default.join(sourceDir, "**"), {
        matchDirectories: false,
    });
    const files = (await globber.glob()).map((x) => path_1.default.relative(sourceDir, x));
    return files;
}
exports.getSourceFiles = getSourceFiles;

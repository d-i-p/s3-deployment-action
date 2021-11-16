"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateChanges = void 0;
const differenceInCalendarDays_1 = __importDefault(require("date-fns/differenceInCalendarDays"));
function calculateChanges({ lastDeploymentLog, files, maxDays, }) {
    const now = Date.now();
    const isExpiredFile = ({ obsoleteSince }) => obsoleteSince !== null && (0, differenceInCalendarDays_1.default)(now, new Date(obsoleteSince)) > maxDays;
    console.log({ lastDeploymentLog });
    const filesToDelete = lastDeploymentLog.filter(isExpiredFile).map(({ path }) => path);
    const newDeploymentLogMap = new Map();
    lastDeploymentLog
        .filter((x) => !isExpiredFile(x))
        .forEach(({ path, obsoleteSince }) => newDeploymentLogMap.set(path, obsoleteSince !== null && obsoleteSince !== void 0 ? obsoleteSince : new Date(now).toISOString()));
    files.forEach((path) => newDeploymentLogMap.set(path, null));
    return {
        newDeploymentLog: Array.from(newDeploymentLogMap.entries()).map(([path, obsoleteSince]) => ({
            path,
            obsoleteSince,
        })),
        filesToDelete,
    };
}
exports.calculateChanges = calculateChanges;

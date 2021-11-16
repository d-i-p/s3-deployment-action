import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
export function calculateChanges({ lastDeploymentLog, files, maxDays, }) {
    const now = new Date();
    const isExpiredFile = ({ obsoleteSince }) => obsoleteSince !== null && differenceInCalendarDays(now, new Date(obsoleteSince)) > maxDays;
    const filesToDelete = lastDeploymentLog.filter(isExpiredFile).map(({ path }) => path);
    const newDeploymentLogMap = new Map();
    lastDeploymentLog
        .filter((x) => !isExpiredFile(x))
        .forEach(({ path, obsoleteSince }) => newDeploymentLogMap.set(path, obsoleteSince ?? now.toISOString()));
    files.forEach((path) => newDeploymentLogMap.set(path, null));
    return {
        newDeploymentLog: Array.from(newDeploymentLogMap.entries()).map(([path, obsoleteSince]) => ({
            path,
            obsoleteSince,
        })),
        filesToDelete,
    };
}

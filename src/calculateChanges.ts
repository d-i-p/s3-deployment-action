import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { DeploymentFile } from "./action";

export function calculateChanges({
  lastDeploymentLog,
  files,
  maxDays,
}: {
  lastDeploymentLog: DeploymentFile[];
  files: string[];
  maxDays: number;
}) {
  const now = Date.now();
  const isExpiredFile = ({ obsoleteSince }: DeploymentFile) =>
    obsoleteSince !== null && differenceInCalendarDays(now, new Date(obsoleteSince)) > maxDays;

  const filesToDelete = lastDeploymentLog.filter(isExpiredFile).map(({ path }) => path);

  const newDeploymentLogMap = new Map<string, string | null>();
  lastDeploymentLog
    .filter((x) => !isExpiredFile(x))
    .forEach(({ path, obsoleteSince }) => newDeploymentLogMap.set(path, obsoleteSince ?? new Date(now).toISOString()));

  files.forEach((path) => newDeploymentLogMap.set(path, null));

  return {
    newDeploymentLog: Array.from(newDeploymentLogMap.entries()).map(([path, obsoleteSince]) => ({
      path,
      obsoleteSince,
    })),
    filesToDelete,
  };
}

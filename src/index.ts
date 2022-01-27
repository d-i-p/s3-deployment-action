import core from "@actions/core";
import { action } from "./action";

export function getActionParams() {
  return {
    bucket: core.getInput("bucket", {
      required: true,
    }),
    sourceDir: core.getInput("source-dir", {
      required: true,
    }),
    maxDays: parseInt(
      core.getInput("max-days", {
        required: false,
      })
    ),
  };
}

try {
  await action(getActionParams());
} catch (error) {
  console.error(error);
  core.setFailed(error instanceof Error ? error.message : "Some error occurred");
}

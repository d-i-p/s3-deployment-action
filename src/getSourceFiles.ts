import * as glob from "@actions/glob";
import path from "path";

export async function getSourceFiles({ sourceDir }: { sourceDir: string }): Promise<string[]> {
  const globber = await glob.create(path.join(sourceDir, "**"), {
    matchDirectories: false,
  });
  return await globber.glob();
}

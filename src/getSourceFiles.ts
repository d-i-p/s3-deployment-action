import glob from "@actions/glob";
import path from "path";

export async function getSourceFiles({ sourceDir }: { sourceDir: string }): Promise<string[]> {
  const globber = await glob.create(path.join(sourceDir, "**"), {
    matchDirectories: false,
  });
  const files = (await globber.glob()).map((x) => path.relative(sourceDir, x));
  return files;
}

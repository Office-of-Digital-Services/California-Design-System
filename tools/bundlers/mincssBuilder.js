import path from "path";
import { promises as fs } from "fs";
import chalk from "chalk";
import { bundle } from "lightningcss";

export default async function (distPath) {
  const srcPath = "src/_bundles/bundle.css";

  // https://lightningcss.dev/bundling.html
  const { code, map } = bundle({
    filename: srcPath,
    minify: true,
  });

  console.log(
    `${chalk.blue("[Eureka]")} Writing ./${distPath} ${chalk.gray(`from ./${srcPath} (CSS)`)}`
  );

  await fs.mkdir(path.dirname(distPath), { recursive: true });
  return fs.writeFile(distPath, code);
}

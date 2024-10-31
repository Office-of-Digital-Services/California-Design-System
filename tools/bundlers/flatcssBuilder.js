import path from "path";
import { promises as fs } from "fs";
import chalk from "chalk";
import { bundle } from "lightningcss";
import postcss from "postcss";
import postcssNested from "postcss-nested";

export default async function (distPath) {
  const srcPath = "src/_bundles/bundle.css";

  // https://lightningcss.dev/bundling.html
  const { code, map } = bundle({
    filename: srcPath,
    //minify: true
  });

  // Flatten CSS using postcss and postcssNested
  const result = await postcss([postcssNested]).process(code, {
    from: undefined,
  });

  console.log(
    `${chalk.blue("[Eureka]")} Writing ./${distPath} ${chalk.gray(`from ./${srcPath} (CSS)`)}`
  );
  await fs.mkdir(path.dirname(distPath), { recursive: true });
  return fs.writeFile(distPath, result.css);
}

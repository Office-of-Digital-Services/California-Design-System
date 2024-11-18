import path from 'node:path';
import { promises as fs } from 'node:fs';
import chalk from 'chalk';
import { bundle, Features } from 'lightningcss';

const packageData = await fs.readFile('package.json')
  .then((data) => JSON.parse(data));

const banner = `/*
* California Design System
* https://github.com/Office-of-Digital-Services/California-Design-System
* 
* Version: ${packageData.version}
* Release Notes: https://github.com/Office-of-Digital-Services/California-Design-System/releases/tag/v${packageData.version}
*/`

export default async function(distPath, { minify = false } = {}) {
  const srcPath = "src/_bundles/bundle.css";

  // https://lightningcss.dev/bundling.html
  const { code, map } = bundle({
    filename: srcPath,
    include: Features.Nesting,
    minify
  });

  const fileData = `${banner}\n${code}`;

  console.log(`${chalk.blue("[Eureka]")} Writing ./${distPath} ${chalk.gray(`from ./${srcPath} (CSS)`)}`);

  await fs.mkdir(path.dirname(distPath), { recursive: true });
  return fs.writeFile(distPath, fileData);
}
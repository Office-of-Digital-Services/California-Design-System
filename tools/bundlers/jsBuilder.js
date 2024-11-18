import { promises as fs } from 'fs';
import chalk from 'chalk';
import esbuild from 'esbuild';

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
  const srcPath = "src/_bundles/bundle.js";

  console.log(`${chalk.blue("[Eureka]")} Writing ./${distPath} ${chalk.gray(`from ./${srcPath} (JavaScript)`)}`);

  // https://esbuild.github.io/api/#bundle
  return esbuild.build({
    entryPoints: [srcPath],
    bundle: true,
    banner: {
      js: banner
    },
    outfile: distPath,
    minify,
  });
}
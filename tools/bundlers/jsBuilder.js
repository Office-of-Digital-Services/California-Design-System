import chalk from 'chalk';
import esbuild from 'esbuild';

export default async function(distPath) {
  const srcPath = "src/_bundles/bundle.js";

  console.log(`${chalk.blue("[Eureka]")} Writing ./${distPath} ${chalk.gray(`from ./${srcPath} (JavaScript)`)}`);

  // https://esbuild.github.io/api/#bundle
  return esbuild.build({
    entryPoints: [srcPath],
    bundle: true,
    outfile: distPath,
  });
}
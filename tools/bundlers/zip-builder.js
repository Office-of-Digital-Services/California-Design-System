import fs from "node:fs";
import { glob } from "glob";
import chalk from "chalk";
import archiver from "archiver";

/**
 * Builds a zip file from a source directory.
 * @param {String} srcDir The source directory with files to be zipped.
 * @param {String} distPath The output path of the finished ZIP file.
 * @returns {Promise}
 */
export default async function (srcDir, distPath) {
	// Grab the file list before we add the ZIP file.
	const buildFiles = await glob(`${srcDir}/*!(.zip)`);

  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(distPath);

	console.log(
		`${chalk.blue("[Eureka]")} Writing ./${distPath} ${chalk.gray(`from ./${srcDir} (ZIP)`)}`,
	);

  return new Promise((resolve, reject) => {
    for (const buildFile of buildFiles) {
			archive.file(buildFile, { name: buildFile.replace(`${srcDir}/`, "") });
		}
    archive.on('error', err => reject(err))
    archive.pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
}
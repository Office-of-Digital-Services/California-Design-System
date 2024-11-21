import { promises as fs } from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { Features, bundle } from "lightningcss";

/**
 * Compiles the CSS bundle to a given path.
 * @param {string} distPath The output path of the finished CSS file.
 * @param {Object} options An optional collection of settings.
 * @param {string} options.banner A commented banner to place at the top of the built file.
 * @param {boolean} options.minify A toggle to enable minification of the build output.
 * @returns {Promise}
 */
export default async function (distPath, { banner = "", minify = false } = {}) {
	const srcPath = "src/css/_bundle.css";

	// https://lightningcss.dev/bundling.html
	const { code, map } = bundle({
		filename: srcPath,
		include: Features.Nesting,
		minify,
	});

	const fileData = `${banner}\n${code}`;

	console.log(
		`${chalk.blue("[Eureka]")} Writing ./${distPath} ${chalk.gray(`from ./${srcPath} (CSS)`)}`,
	);

	await fs.mkdir(path.dirname(distPath), { recursive: true });
	return fs.writeFile(distPath, fileData);
}

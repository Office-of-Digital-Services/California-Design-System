import chalk from "chalk";
import esbuild from "esbuild";

/**
 * Compiles the Javascript bundle to a given path.
 * @param {string} distPath The output path of the finished JS file.
 * @param {Object} options An optional collection of settings.
 * @param {string} options.banner A commented banner to place at the top of the built file.
 * @param {boolean} options.minify A toggle to enable minification of the build output.
 * @returns {Promise}
 */
export default async function (distPath, { banner = "", minify = false } = {}) {
	const srcPath = "src/js/_bundle.js";

	console.log(
		`${chalk.blue("[Eureka]")} Writing ./${distPath} ${chalk.gray(`from ./${srcPath} (JavaScript)`)}`,
	);

	// https://esbuild.github.io/api/#bundle
	return esbuild.build({
		entryPoints: [srcPath],
		bundle: true,
		banner: {
			js: banner,
		},
		outfile: distPath,
		minify,
	});
}

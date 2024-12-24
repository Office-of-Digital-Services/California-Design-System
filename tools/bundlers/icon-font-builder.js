import { generateFonts, FontAssetType, OtherAssetType } from "fantasticon";
import path from "node:path";
import { promises as fs } from "node:fs";
import chalk from "chalk";

/**
 * Compiles the icon font.
 * @param {string} distDir The output path for the finished fonts.
 * @param {Object} options An optional collection of settings.
 * @param {string} options.fontsUrl The URL path prefix to append to CSS definitions of the icon font source.
 * @param {boolean} options.css Whether to generate the corresponding CSS source.
 * @returns {Promise}
 */
export default async function (
	distDir,
	{ fontsUrl = "/fonts", css = true } = {},
) {
	const srcDir = "src/icons";

	await fs.mkdir(distDir, { recursive: true });

	console.log(
		`${chalk.blue("[Eureka]")} Writing ./${distDir} ${chalk.gray(`from ./${srcDir} (Icons)`)}`,
	);

	await generateFonts({
		inputDir: srcDir,
		outputDir: distDir,
		name: "California-Design-System-Icon-Font",
		fontTypes: [FontAssetType.WOFF2, FontAssetType.WOFF],
		assetTypes: [...(css ? [OtherAssetType.CSS] : []), OtherAssetType.JSON],
		formatOptions: { json: { indent: 2 } },
		templates: {
			css: "./tools/bundlers/icon-font-css.hbs",
		},
		pathOptions: {
			css: "./src/css/icons.css",
		},
		fontHeight: 300,
		normalize: undefined,
		tag: "ca-icon",
		fontsUrl,
	});
}

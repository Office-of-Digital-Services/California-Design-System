
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import cssBuilder from "./tools/bundlers/css-builder.js";
import jsBuilder from "./tools/bundlers/js-builder.js";

let firstBuild = true;
const cssBuildPath = "_site/css/bundle.css";
const jsBuildPath = "_site/js/bundle.js";

export default async function (eleventyConfig) {
	eleventyConfig.on("eleventy.before", async ({ runMode }) => {
		// Only build all of the bundle files during first run, not on every change.
		if (firstBuild || runMode !== "serve") {
			await cssBuilder(cssBuildPath);
			await jsBuilder(jsBuildPath);
			firstBuild = false;
		}
	});

	eleventyConfig.on("eleventy.beforeWatch", async (changedFiles) => {
		// During development changes, only reload the bundles that need reloading.
		for (const changedFile of changedFiles) {
			if (changedFile.endsWith(".css")) {
				await cssBuilder(cssBuildPath);
			}
			if (changedFile.endsWith(".js")) {
				await jsBuilder(jsBuildPath);
			}
		}
	});

	eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

	eleventyConfig.addGlobalData("layout", "layout");
	eleventyConfig.addPassthroughCopy({
		"static/images": "images",
		"static/images/favicon.ico": "/favicon.ico",
	});

	eleventyConfig.addWatchTarget("./src");
	eleventyConfig.addWatchTarget("./pages");
	eleventyConfig.addWatchTarget("./tools/11ty");

	// Ignores
	eleventyConfig.ignores.add("*.md"); // Repo root markdowns
	eleventyConfig.ignores.add("*.js"); // Repo root configs

	return {
		// allow nunjucks templating in .html files
		htmlTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		templateFormats: ["html", "njk", "11ty.js", "md"],
		dir: {
			// site content pages
			input: ".",
			// site structure pages (path is relative to input directory)
			includes: "tools/11ty/_includes",
			// site final output directory
			output: "_site",
		},
	};
}

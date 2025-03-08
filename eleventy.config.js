import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import cssBuilder from "./tools/bundlers/css-builder.js";
import jsBuilder from "./tools/bundlers/js-builder.js";
import { build } from "esbuild";

let firstBuild = true;
const jsBuildPath = "_site/js/bundle.js";

async function build11tyCss() {
  // CSS Bundle
  await cssBuilder("src/css/_bundle.css", "_site/css/bundle.css");
  // CSS Coastal Blue Theme
  await cssBuilder("src/css/theme-coastal.css", "_site/css/theme.coastal.css");
  // CSS Desert Tan Theme
  await cssBuilder("src/css/theme-desert.css", "_site/css/theme.desert.css");
  // CSS Mountain Gray Theme
  await cssBuilder(
    "src/css/theme-mountain.css",
    "_site/css/theme.mountain.css",
  );
  // CSS Valley Green Theme
  await cssBuilder("src/css/theme-valley.css", "_site/css/theme.valley.css");
}

export default async function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async ({ runMode }) => {
    // Only build all of the bundle files during first run, not on every change.
    if (firstBuild || runMode !== "serve") {
      await build11tyCss();

      await jsBuilder(jsBuildPath);
      firstBuild = false;
    }
  });

  eleventyConfig.on("eleventy.beforeWatch", async (changedFiles) => {
    // During development changes, only reload the bundles that need reloading.
    for (const changedFile of changedFiles) {
      if (changedFile.endsWith(".css")) {
        await build11tyCss();
      }
      if (changedFile.endsWith(".js")) {
        await jsBuilder(jsBuildPath);
      }
    }
  });

  eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

  eleventyConfig.addGlobalData("layout", "base-layout");
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

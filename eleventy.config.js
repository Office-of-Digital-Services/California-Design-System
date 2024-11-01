import mincssBuilder from "./tools/bundlers/mincssBuilder.js";
import flatcssBuilder from "./tools/bundlers/flatcssBuilder.js";
import jsBuilder from "./tools/bundlers/jsBuilder.js";
import path from "path";
import postcss from "postcss";
import postcssNested from "postcss-nested";

let firstBuild = true;
const mincssBuildPath = "_site/css/bundle.min.css";
const flatcssBuildPath = "_site/css/bundle.flat.css";
const jsBuildPath = "_site/js/bundle.js";

/**
 * @param {string} content
 */
const minifyCSS = (content) =>
  content
    .replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, "")
    .replace(/ {2,}/g, " ")
    .replace(/ ([{:}]) /g, "$1")
    .replace(/([{:}]) /g, "$1")
    .replace(/([;,]) /g, "$1")
    .replace(/ !/g, "!");

export default async function (eleventyConfig) {
  eleventyConfig.addTransform(
    "staticPaths",
    /**
     * @param {string} content
     * @param {string} outputPath
     */
    async function (content, outputPath) {
      const basePath = "_site"; // Adjust this if your output directory is different
      const relativePath = path
        .relative(path.dirname(outputPath), path.dirname(basePath))
        .slice(0, -2); // Removing last 2 dots
      return content
        .replace(/href="(.*\/)"/g, 'href="$1index.html"') // Fixing any root path links
        .replace(/=\"\//g, `="${relativePath}`); // Replace all ... ="/  ... with new path
    }
  );

  eleventyConfig.on("eleventy.before", async ({ runMode }) => {
    const buildPromises = [];
    // Only build all of the bundle files during first run, not on every change.
    if (firstBuild || runMode !== "serve") {
      buildPromises.push(mincssBuilder(mincssBuildPath));
      buildPromises.push(flatcssBuilder(flatcssBuildPath));
      buildPromises.push(jsBuilder(jsBuildPath));
      firstBuild = false;
    }
    await Promise.all(buildPromises);
  });

  eleventyConfig.on("eleventy.beforeWatch", async (changedFiles) => {
    // During development changes, only reload the bundles that need reloading.
    await changedFiles.forEach(async (changedFile) => {
      if (changedFile.endsWith(".css")) {
        await mincssBuilder(mincssBuildPath);
        await flatcssBuilder(flatcssBuildPath);
      }
      if (changedFile.endsWith(".js")) {
        await jsBuilder(jsBuildPath);
      }
    });
  });

  eleventyConfig.addGlobalData("layout", "base");
  eleventyConfig.addPassthroughCopy({
    "static/images": "images",
    "static/images/favicon.ico": "/favicon.ico",
    "tools/11ty/root": "/",
  });

  // Watching css updates
  eleventyConfig.addWatchTarget("./src");
  eleventyConfig.addWatchTarget("./pages");
  eleventyConfig.addWatchTarget("./tools/11ty");

  // Ignores
  eleventyConfig.ignores.add("*.md"); // Repo root markdowns
  eleventyConfig.ignores.add("*.js"); // Repo root configs

  // For making a non-nested fallback
  eleventyConfig.addFilter("flattenCSS", async (code) => {
    const result = await postcss([postcssNested]).process(code, {
      from: undefined,
    });
    return result.css;
  });

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

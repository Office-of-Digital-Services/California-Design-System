//@ts-check
const defaultConfig = require("@11ty/eleventy/src/defaultConfig");
const domain = "https://designsystem.webstandards.ca.gov";
const path = require("path");

module.exports = function (
  /** @type {import("@11ty/eleventy").UserConfig} **/ eleventyConfig
) {
  // Copy `src/css/` to `_site/css`, `src/images/` to `_site/images`
  // Copy all static files that should appear in the website root
  // Copy state tempate code files from NPM
  eleventyConfig.addPassthroughCopy({
    "src/images": "images",
    "src/root": "/"
  });

  //Sorted list of all the samples
  eleventyConfig.addFilter(
    "canonical",
    (/** @type {{url:string}} */ page) => domain + page.url
  );

  //Watching css updates
  eleventyConfig.addWatchTarget("./src/css/");

  //Start with default config, easier to configure 11ty later
  const config = defaultConfig(eleventyConfig);

  // allow nunjucks templating in .html files
  config.htmlTemplateEngine = "njk";
  config.markdownTemplateEngine = "njk";
  config.templateFormats = ["html", "njk", "11ty.js", "md"];

  config.dir = {
    // site content pages
    input: "src",
    data: "../src/_data",
    // site structure pages (path is realtive to input directory)
    includes: "../src/_includes",
    layouts: "../src/_includes/layouts",
    // site final outpuut directory
    output: "_site"
  };

  //Adding a transform to make the output work as non-server static files
  eleventyConfig.addTransform(
    "staticPaths",
    /**
     * @param {string} content
     * @param {string} outputPath
     */
    async function (content, outputPath) {
      const basePath = config.dir.output;

      const relativePath = path
        .relative(path.dirname(outputPath), path.dirname(basePath))
        .slice(0, -2); //removing last 2 dots

      return content
        .replace(/href="(.*\/)"/g, 'href="$1index.html"') // fixing any root path links
        .replace(/=\"\//g, `="${relativePath}`); //Replace all ... ="/  ... with new path
    }
  );

  return config;
};

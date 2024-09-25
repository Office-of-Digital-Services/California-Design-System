import cssBuilder from './tools/bundlers/cssBuilder.js';
import jsBuilder from './tools/bundlers/jsBuilder.js';

let firstBuild = true;
const cssBuildPath = '_site/css/bundle.css';
const jsBuildPath = '_site/js/bundle.js';

export default async function(eleventyConfig) {
  eleventyConfig.on("eleventy.before", async ({ runMode }) => {
    const buildPromises = [];
    // Only build all of the bundle files during first run, not on every change.
    if (firstBuild || runMode !== "serve") {
      buildPromises.push(cssBuilder(cssBuildPath));
      buildPromises.push(jsBuilder(jsBuildPath));
      firstBuild = false;
    }
    await Promise.all(buildPromises);
  });

  eleventyConfig.on("eleventy.beforeWatch", async changedFiles => {
    // During development changes, only reload the bundles that need reloading.
    await changedFiles.forEach(async changedFile => {
      if (changedFile.endsWith(".css")) { await cssBuilder(cssBuildPath); }
      if (changedFile.endsWith(".js")) { await jsBuilder(jsBuildPath); }
    });
  });

  eleventyConfig.addGlobalData("layout", "base");

  eleventyConfig.addPassthroughCopy({
    "static/images": "images",
    "static/images/favicon.ico": "/favicon.ico",
    "tools/11ty/root": "/"
  });

  //Watching css updates
  eleventyConfig.addWatchTarget("./src");
  eleventyConfig.addWatchTarget("./pages");
  eleventyConfig.addWatchTarget("./tools/11ty");

  //Ignores
  eleventyConfig.ignores.add("*.md") // Repo root markdowns
  eleventyConfig.ignores.add("*.js") // Repo root configs

  return {
    // allow nunjucks templating in .html files
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "11ty.js", "md"],
    dir: {
      // site content pages
      input: ".",
      // site structure pages (path is realtive to input directory)
      includes: "tools/11ty/_includes",
      // site final outpuut directory
      output: "_site"
    }
  };
}

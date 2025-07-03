import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import * as cheerio from "cheerio";
import hljs from "highlight.js";
import htmlPrettify from "html-prettify";
import cssBuilder from "./tools/bundlers/css-builder.js";
import jsBuilder from "./tools/bundlers/js-builder.js";

let firstBuild = true;
const jsBuildPath = "_site/js/bundle.js";

async function build11tyCss() {
  // CSS Bundle
  await cssBuilder("src/css/_bundle.css", "_site/css/bundle.css");
  // CSS Coastal Blue Theme
  await cssBuilder("src/css/theme/_coastal.css", "_site/css/theme.coastal.css");
  // CSS Desert Tan Theme
  await cssBuilder("src/css/theme/_desert.css", "_site/css/theme.desert.css");
  // CSS Mountain Gray Theme
  await cssBuilder(
    "src/css/theme/_mountain.css",
    "_site/css/theme.mountain.css",
  );
  // CSS Valley Green Theme
  await cssBuilder("src/css/theme/_valley.css", "_site/css/theme.valley.css");
  // Non-system demo-site CSS
  await cssBuilder(
    "tools/demo-site-only-src/css/_bundle.css",
    "_site/css/demo-only.css",
  );
}

async function build11tyJs() {
  // JS Bundle
  await jsBuilder("src/js/_bundle.js", "_site/js/bundle.js");
  // Non-system demo-site JS
  await jsBuilder(
    "tools/demo-site-only-src/js/_bundle.js",
    "_site/js/demo-only.js",
  );
}

export default async function (eleventyConfig) {
  eleventyConfig.on("eleventy.before", async ({ runMode }) => {
    // Only build all of the bundle files during first run, not on every change.
    if (firstBuild || runMode !== "serve") {
      await build11tyCss();
      await build11tyJs();
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
        await build11tyJs();
      }
    }
  });

  eleventyConfig.addTransform("html-transform", async (content) => {
    const $ = cheerio.load(content);
    const demos = $("ca-code-demo");

    if (demos.length > 0) {
      demos.each((i, el) => {
        const $template = $(el).find("template").clone();

        if ($template.length > 0) {
          const templateHtml = htmlPrettify($template.html()).replaceAll(
            '=""',
            "",
          );
          const highlightedCode = hljs.highlight(templateHtml, {
            language: "html",
          }).value;
          $(el).append(`<div class="example-block">${templateHtml}</div>`);
          $(el).append(
            `<div class="example-code"><pre class="hljs"><code>${highlightedCode}</code></pre></div>`,
          );
        }
      });
    }

    return $.html();
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
  eleventyConfig.addWatchTarget("./tools/demo-site-only-src");

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

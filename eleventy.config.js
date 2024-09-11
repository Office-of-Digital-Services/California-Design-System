import * as sass from 'sass';
import { rollup } from 'rollup';
import { glob } from 'glob';
import chalk from 'chalk';
import fs from 'fs/promises';
import path from 'path';
import tokens from './parts/tokens/tokens.11ty.js';

let firstBuild = true;

/**
 * Generate a CSS bundle from a given SCSS file.
 * @param {string} filePath The relative path to the SCSS source.
 * @param {string} prepender An optional string to put at the top of the generated file.
 */
async function generateSass(filePath, prepender = "") {
  const srcDir = path.dirname(filePath);
  const srcFile = path.basename(filePath);

  // Render CSS from Sass. No writes to disk yet.
  const sassResult = await sass.compileAsync(filePath);

  const outDir = `_dist/${srcDir}`;
  const outFile = srcFile.replace(".scss", ".css");
  const outPath = `${outDir}/${outFile}`;
  
  // Need to create the directory structure for the output file.
  await fs.mkdir(outDir, { recursive: true });

  // Write the CSS file.
  console.log(`${chalk.blue("[Eureka]")} Writing ./${outPath} ${chalk.gray(`from ./${filePath} (sass)`)}`);
  await fs.writeFile(outPath, `${prepender}${sassResult.css}`);
}

/**
 * Generate a JavaScript bundle via Rollup.
 * @param {string} filePath The relative path to the JS source.
 */
async function generateRollup(filePath) {
  const srcDir = path.dirname(filePath);
  const srcFile = path.basename(filePath);

  // Don't process 11ty files in Rollup.
  if (
    srcFile.endsWith(".11ty.js") 
    || srcFile.endsWith(".11tydata.js") 
    || srcFile.startsWith("eleventy")) { return; }

  // This is the main configuration object for Rollup.
  // This is what would usually go into your rollup.config.js file.
  // The main exception is that the "output" section is separated, below.
  const rollupInputOptions = {
    input: filePath
  };

  // Generate the JS bundle with Rollup. No writes to disk yet.
  const bundle = await rollup(rollupInputOptions);

  const outDir = `_dist/${srcDir}`;
  const outFile = srcFile;
  const outPath = `${outDir}/${outFile}`;

  // This is the "output" subsection of the Rollup config.
  // It determines where to write the file.
  const rollupOutputOptions ={
    file: outPath,
    format: "esm"
  };

  // Write the JS file.
  console.log(`${chalk.blue("[Eureka]")} Writing ${outPath} ${chalk.gray(`from ./${filePath} (rollup)`)}`);
  await bundle.write(rollupOutputOptions);
  await bundle.close();
}



/**
 * 11ty config starts here!
 */


export default async function(eleventyConfig) {
  // Before each 11ty template build, we'll process the CSS/JS assets.
  eleventyConfig.on("eleventy.before", async ({ runMode }) => {
    const buildPromises = [];

    // Only build all of the part files during first run, not on every change.
    if (firstBuild || runMode !== "serve") {
      const sassParts = await glob("parts/**/*.scss");
      const sassPartPromises = sassParts.map((sassPart) => generateSass(sassPart));
      const rollupParts = await glob("parts/**/*!(11ty).js");
      const rollupPartPromises = rollupParts.map((rollupPart) => generateRollup(rollupPart));
      buildPromises.push(...sassPartPromises, ...rollupPartPromises);
      firstBuild = false;
    }

    // Build CSS Vars from tokens JSON file.
    const tokener = new tokens();
    const tokenVars = await tokener.render();

    // Build pack files on every change.
    const sassPacks = await glob("packs/**/*.scss");
    const sassPackPromises = sassPacks.map((sassPack) => generateSass(sassPack, tokenVars));
    const rollupPacks = await glob("packs/**/*.js");
    const rollupPackPromises = rollupPacks.map((rollupPack) => generateRollup(rollupPack));
    buildPromises.push(...sassPackPromises, ...rollupPackPromises);

    await Promise.all(buildPromises);
  });


  eleventyConfig.on("eleventy.beforeWatch", async changedFiles => {
    await changedFiles.forEach(async changedFile => {
      if (changedFile.endsWith(".scss")) {
        await generateSass(changedFile);
      }
      if (changedFile.endsWith(".js")) {
        await generateRollup(changedFile);
      }
    });
  });

  eleventyConfig.addPassthroughCopy({
    "demo/images": "images",
    "demo/root": "/"
  });

  //Watching css updates
  eleventyConfig.addWatchTarget("./parts");
  eleventyConfig.addWatchTarget("./packs");
  eleventyConfig.addWatchTarget("./demo");

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
      data: "demo/_data",
      // site structure pages (path is realtive to input directory)
      includes: "demo/_includes",
      layouts: "demo/_includes/layouts",
      // site final outpuut directory
      output: "_dist"
    }
  };
}

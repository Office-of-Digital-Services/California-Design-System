import { promises as fs } from "node:fs";
import cssBuilder from "./css-builder.js";
import jsBuilder from "./js-builder.js";
import zipBuilder from "./zip-builder.js";

const packageData = await fs
  .readFile("package.json")
  .then((data) => JSON.parse(data));

// Common fileName for bundle files.
const fileSlug = "dist/California-Design-System";

// Banner is placed at the top of bundled CSS and JS files.
const banner = `/*
* California Design System
* https://github.com/Office-of-Digital-Services/California-Design-System
* 
* Version: ${packageData.version}
* Release Notes: https://github.com/Office-of-Digital-Services/California-Design-System/releases/tag/v${packageData.version}
*/`;

// Delete old build files.
await fs.rm("dist", { recursive: true, force: true });
await fs.mkdir("dist");

// Include critical image files
await fs.mkdir("dist/images");
await fs.copyFile("static/images/favicon.ico", "dist/images/favicon.ico");

// Build all files first.

// CSS Bundle
await cssBuilder("src/css/_bundle.css", `${fileSlug}.css`, { banner });
await cssBuilder("src/css/_bundle.css", `${fileSlug}.min.css`, {
  banner,
  minify: true,
});

// CSS Coastal Blue Theme
await cssBuilder(
  "src/css/theme/_coastal.css",
  `${fileSlug}.theme.coastal.css`,
  {
    banner,
  },
);
await cssBuilder(
  "src/css/theme/_coastal.css",
  `${fileSlug}.theme.coastal.min.css`,
  {
    banner,
    minify: true,
  },
);

// CSS Desert Tan Theme
await cssBuilder("src/css/theme/_desert.css", `${fileSlug}.theme.desert.css`, {
  banner,
});
await cssBuilder(
  "src/css/theme/_desert.css",
  `${fileSlug}.theme.desert.min.css`,
  {
    banner,
    minify: true,
  },
);

// CSS Mountain Gray Theme
await cssBuilder(
  "src/css/theme/_mountain.css",
  `${fileSlug}.theme.mountain.css`,
  { banner },
);
await cssBuilder(
  "src/css/theme/_mountain.css",
  `${fileSlug}.theme.mountain.min.css`,
  {
    banner,
    minify: true,
  },
);

// CSS Valley Green Theme
await cssBuilder("src/css/theme/_valley.css", `${fileSlug}.theme.valley.css`, {
  banner,
});
await cssBuilder(
  "src/css/theme/_valley.css",
  `${fileSlug}.theme.valley.min.css`,
  {
    banner,
    minify: true,
  },
);

// JavaScript
await jsBuilder("src/js/_bundle.js", `${fileSlug}.js`, { banner });
await jsBuilder("src/js/_bundle.js", `${fileSlug}.min.js`, {
  banner,
  minify: true,
});

// Then compile builds into the zip.
await zipBuilder("dist", `${fileSlug}-${packageData.version}.zip`);

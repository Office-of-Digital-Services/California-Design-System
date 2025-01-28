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
await fs.copyFile("static/images/icons.svg", "dist/images/icons.svg");
await fs.copyFile("static/images/favicon.ico", "dist/images/favicon.ico");

// Build all files first.
await cssBuilder(`${fileSlug}.css`, { banner });
await cssBuilder(`${fileSlug}.min.css`, { banner, minify: true });
await jsBuilder(`${fileSlug}.js`, { banner });
await jsBuilder(`${fileSlug}.min.js`, { banner, minify: true });

// Then compile builds into the zip.
await zipBuilder("dist", `${fileSlug}-${packageData.version}.zip`);

#!/usr/bin/env node

// Generate CSS mask-image rules for each SVG in src/icons
// Outputs CSS to stdout

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

function getIconsDirectory() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const iconsDir = path.resolve(path.join(__dirname, "../src/icons"));
  if (!fs.existsSync(iconsDir)) {
    throw new Error(`Icons directory not found: ${iconsDir}`);
  }
  return iconsDir;
}

function readSvgFiles(iconsDir) {
  const entries = fs.readdirSync(iconsDir, { withFileTypes: true });
  return entries
    .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".svg"))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b));
}

function encodeSvgContent(svgContent) {
  // Ensure string and normalize line endings
  const text = String(svgContent);
  // URL-encode entire SVG payload
  return text;
}

function buildCssRule(iconName, encodedSvg) {
  return `ca-icon[name="${iconName}"]::after {\n  mask-image: url('data:image/svg+xml;utf8,${encodedSvg}');\n}`;
}

function main() {
  const iconsDir = getIconsDirectory();
  const svgFiles = readSvgFiles(iconsDir);

  const cssRules = [];
  for (const fileName of svgFiles) {
    const nameWithoutExt = fileName.replace(/\.svg$/i, "");
    const filePath = path.join(iconsDir, fileName);
    const svgContent = fs.readFileSync(filePath, "utf8");
    const encoded = encodeSvgContent(svgContent);
    cssRules.push(buildCssRule(nameWithoutExt, encoded));
  }

  // Print all rules to stdout
  console.log(cssRules.join("\n\n"));
}

try {
  main();
} catch (error) {
  console.error(String(error?.stack || error));
  process.exit(1);
}

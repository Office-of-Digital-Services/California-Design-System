import cssBuilder from "./css-builder.js";
import jsBuilder from "./js-builder.js";

await cssBuilder("dist/bundle.css");
await cssBuilder("dist/bundle.min.css", { minify: true });
await jsBuilder("dist/bundle.js");
await jsBuilder("dist/bundle.min.js", { minify: true });

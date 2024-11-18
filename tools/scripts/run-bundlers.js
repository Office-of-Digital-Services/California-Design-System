import cssBuilder from "../bundlers/cssBuilder.js";
import jsBuilder from "../bundlers/jsBuilder.js";

await cssBuilder("dist/bundle.css");
await cssBuilder("dist/bundle.min.css", { minify: true });
await jsBuilder("dist/bundle.js");
await jsBuilder("dist/bundle.min.js", { minify: true });

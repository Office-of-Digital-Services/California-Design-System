import cssBuilder from "../bundlers/cssBuilder.js";
import flatcssBuilder from "../bundlers/flatcssBuilder.js";
import jsBuilder from "../bundlers/jsBuilder.js";

await cssBuilder("dist/bundle.css");
await flatcssBuilder("dist/bundle.flat.css");
await jsBuilder("dist/bundle.js");

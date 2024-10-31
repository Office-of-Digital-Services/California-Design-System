import cssBuilder from "../bundlers/cssBuilder.js";
import mincssBuilder from "../bundlers/mincssBuilder.js";
import flatcssBuilder from "../bundlers/flatcssBuilder.js";
import jsBuilder from "../bundlers/jsBuilder.js";

await cssBuilder("dist/bundle.css");
await mincssBuilder("dist/bundle.min.css");
await flatcssBuilder("dist/bundle.flat.css");
await jsBuilder("dist/bundle.js");

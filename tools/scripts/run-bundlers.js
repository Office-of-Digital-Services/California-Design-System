import cssBuilder from "../bundlers/cssBuilder.js";
import jsBuilder from "../bundlers/jsBuilder.js";

await cssBuilder('dist/bundle.css');
await jsBuilder('dist/bundle.js')
import path from "node:path";
import { glob } from "glob";

export default async () => {
  const pageGlobs = await glob("pages/**/*.@(njk|html|md)");
  const reducedPages = pageGlobs.reduce((bucket, page) => {
    const parsedPath = path.parse(page);
    const href = `/${parsedPath.dir}/${parsedPath.name}`;
    const dir =
      parsedPath.dir === "pages"
        ? "[root]"
        : parsedPath.dir.replace("pages/", "");
    const name = parsedPath.name;

    if (bucket[dir] === undefined) {
      bucket[dir] = [];
    }

    const pageSet = bucket[dir];
    pageSet.push({ name, dir, href });
    const sortedPageSet = pageSet.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    bucket[dir] = sortedPageSet;

    return bucket;
  }, {});

  const pageSetKeys = Object.keys(reducedPages);
  const sortedPageSetKeys = pageSetKeys.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const sortedPages = sortedPageSetKeys.map((key) => {
    return reducedPages[key].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  });

  return {
    permalink: "/",
    pages: sortedPages,
  };
};

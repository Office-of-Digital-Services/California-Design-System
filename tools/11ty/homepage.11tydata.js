import path from "node:path";
import { glob } from "glob";

export default async () => {
  const pageGlobs = await glob("pages/**/*.@(njk|html|md)");
  const pages = pageGlobs
    .map((page) => {
      const parsedPath = path.parse(page);
      const href = `/${parsedPath.dir}/${parsedPath.name}`;
      const name = parsedPath.name;

      return {
        href,
        name,
      };
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

  return {
    permalink: "/",
    pages,
  };
};

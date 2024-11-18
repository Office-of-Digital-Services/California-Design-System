import path from "node:path";
import { glob } from "glob";

export default async () => {
	const partGlobs = await glob("src/**/*.@(njk|html)");
	const parts = partGlobs
		.map((part) => {
			const parsedPath = path.parse(part);

			const href = parsedPath.dir.endsWith(parsedPath.name)
				? `/${parsedPath.dir}`
				: `/${parsedPath.dir}/${parsedPath.name}`;
			const group = path.basename(parsedPath.dir);
			const name = parsedPath.name;

			return {
				href,
				group,
				name,
			};
		})
		.sort((part) => part.group);

	const pageGlobs = await glob("pages/**/*.@(njk|html)");
	const pages = pageGlobs.map((page) => {
		const parsedPath = path.parse(page);
		const href = `/${parsedPath.dir}/${parsedPath.name}`;
		const name = parsedPath.name;

		return {
			href,
			name,
		};
	});

	return {
		parts,
		pages,
	};
};

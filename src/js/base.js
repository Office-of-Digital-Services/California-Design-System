/* polyfils */

//@ts-check

window.addEventListener("DOMContentLoaded", () => {
	//POLYFILL for CSS nesting
	if (!CSS.supports("selector(&)")) {
		// CSS Nesting not supported.  Load alternative CSS file
		const link = /** @type {HTMLLinkElement} */ (
			document.getElementById("main-stylesheet")
		);
		link.href = link.href.replace("min", "flat");
		console.log("POLYFILL: Using FLAT CSS instead of Nested");
	}

	//POLYFILL for WEBP to PNG
	const webP = new Image();
	webP.onload = webP.onerror = () => {
		if (webP.height !== 1) {
			// Replace WEBP with PNG
			/** @type {NodeListOf<HTMLImageElement>} */
			const imgs = document.querySelectorAll('img[src$=".webp" i]');
			for (const img of imgs) {
				img.src = img.src.replace(/\.webp$/i, ".png");
			}
			console.log("POLYFILL: Using PNG instead of WEBP");
		}
	};
	webP.src =
		"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
});

const supportsContainerQueries = "container" in document.documentElement.style;

// Conditional Import
//POLYFILL container queries
if (!supportsContainerQueries) {
	const containerScript = document.createElement("script");
	containerScript.src =
		"https://cdn.jsdelivr.net/npm/container-query-polyfill@1/dist/container-query-polyfill.modern.js";
	document.head.append(containerScript);
	//console.log(containerScript);
}

/* preffered theme mode */
window.addEventListener("load", () => {
	window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
});

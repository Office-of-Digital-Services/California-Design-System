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
  webP.onload = webP.onerror = function () {
    if (webP.height !== 1) {
      // Replace WEBP with PNG

      /** @type {NodeListOf<HTMLImageElement>} */ (
        document.querySelectorAll('img[src$=".webp" i]')
      ).forEach((img) => {
        img.src = img.src.replace(/\.webp$/i, ".png");
      });
      console.log("POLYFILL: Using PNG instead of WEBP");
    }
  };
  webP.src =
    "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
});

/* preffered theme mode */
window.addEventListener("load", () => {
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
});

(() => {
  // src/base/theme.js
  window.addEventListener("load", () => {
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // src/header/header.js
  document.addEventListener("DOMContentLoaded", () => {
    const navMenu = document.querySelector("nav.mobile-nav-menu");
    if (navMenu) {
      navMenu.addEventListener("focusin", () => {
        document.body.classList.add("nav-focused");
      });
      navMenu.addEventListener("focusout", () => {
        document.body.classList.remove("nav-focused");
      });
    }
  });
})();

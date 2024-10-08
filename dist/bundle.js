(() => {
  // src/base/theme.js
  window.addEventListener("load", () => {
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // src/header/header.js
  document.addEventListener("DOMContentLoaded", () => {
    const navMenu = document.querySelector("nav.mobile-nav-menu");
    const globalMenu = document.querySelector("nav.cagov-global-menu");
    const siteHeader = document.querySelector("header");
    const globalMenuDrawer = document.querySelector(".cagov-global-menu-drawer");
    let siteHeaderHeight = siteHeader.offsetHeight;
    globalMenuDrawer.style.height = `calc(100% - ${siteHeaderHeight}px)`;
    globalMenuDrawer.style.top = `${siteHeaderHeight}px`;
    if (navMenu) {
      navMenu.addEventListener("focusin", () => {
        document.body.classList.add("nav-focused");
      });
      navMenu.addEventListener("focusout", () => {
        document.body.classList.remove("nav-focused");
      });
    }
    if (globalMenu) {
      globalMenu.addEventListener("focusin", () => {
        document.body.classList.add("nav-focused");
        siteHeaderHeight = siteHeader.offsetHeight;
        globalMenuDrawer.style.height = `calc(100% - ${siteHeaderHeight}px)`;
        globalMenuDrawer.style.top = `${siteHeaderHeight}px`;
      });
      globalMenu.addEventListener("focusout", () => {
        document.body.classList.remove("nav-focused");
      });
    }
  });
})();

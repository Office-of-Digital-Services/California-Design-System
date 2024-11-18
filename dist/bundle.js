/*
* California Design System
* https://github.com/Office-of-Digital-Services/California-Design-System
* 
* Version: 1.1.0
* Release Notes: https://github.com/Office-of-Digital-Services/California-Design-System/releases/tag/v1.1.0
*/
(() => {
  // src/base/base.js
  window.addEventListener("DOMContentLoaded", () => {
    if (!CSS.supports("selector(&)")) {
      const link = (
        /** @type {HTMLLinkElement} */
        document.getElementById("main-stylesheet")
      );
      link.href = link.href.replace("min", "flat");
      console.log("POLYFILL: Using FLAT CSS instead of Nested");
    }
    const webP = new Image();
    webP.onload = webP.onerror = function() {
      if (webP.height !== 1) {
        document.querySelectorAll('img[src$=".webp" i]').forEach((img) => {
          img.src = img.src.replace(/\.webp$/i, ".png");
        });
        console.log("POLYFILL: Using PNG instead of WEBP");
      }
    };
    webP.src = "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";
  });
  var supportsContainerQueries = "container" in document.documentElement.style;
  if (!supportsContainerQueries) {
    const containerScript = document.createElement("script");
    containerScript.src = "https://cdn.jsdelivr.net/npm/container-query-polyfill@1/dist/container-query-polyfill.modern.js";
    document.head.append(containerScript);
  }
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

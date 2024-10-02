document.addEventListener("DOMContentLoaded", () => {
  const navMenu = document.querySelector("nav.mobile-nav-menu");
  const globalMenu = document.querySelector("nav.cagov-global-menu");
  const siteHeader = document.querySelector("header");
  const globalMenuDrawer = document.querySelector(".cagov-global-menu-drawer");

  // Get the current height of the siteHeader element
  let siteHeaderHeight = siteHeader.offsetHeight;

  // Add the height calculation to the style of the globalMenuDrawer element
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

      // Get the current height of the siteHeader element
      siteHeaderHeight = siteHeader.offsetHeight;

      // Add the height calculation to the style of the globalMenuDrawer element
      globalMenuDrawer.style.height = `calc(100% - ${siteHeaderHeight}px)`;
      globalMenuDrawer.style.top = `${siteHeaderHeight}px`;
    });

    globalMenu.addEventListener("focusout", () => {
      document.body.classList.remove("nav-focused");
    });
  }
});

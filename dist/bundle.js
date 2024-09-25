(() => {
  // src/base/theme.js
  window.addEventListener("load", () => {
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // src/header/hamburger.js
  window.addEventListener("load", () => {
    const menuBtn = document.querySelector(".main-navigation-button");
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("open");
    });
  });
})();

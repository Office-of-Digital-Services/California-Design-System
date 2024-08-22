// preffered theme mode

window.addEventListener("load", () => {
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
});

// hamburger menu
window.addEventListener("load", () => {
  const menuBtn = document.querySelector(".main-navigation-button");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
  });
});

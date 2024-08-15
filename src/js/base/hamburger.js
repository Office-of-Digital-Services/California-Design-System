// hamburger menu
window.addEventListener("load", () => {
  const menuBtn = document.querySelector(".main-navigation-button");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
  });
});

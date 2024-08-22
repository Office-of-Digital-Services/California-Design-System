// preffered theme mode

window.addEventListener("load", () => {
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
});

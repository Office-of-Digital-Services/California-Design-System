// hamburger menu
window.addEventListener("load", () => {
  const menuBtn = document.querySelector(".main-navigation-button");

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("open");
  });
});

// Global menu

window.addEventListener("load", () => {
  /** @type {HTMLDivElement} */
  const navRightNavCont = document.querySelector(".cagov-global-menu");
  if (!navRightNavCont) return;

  /** @type {HTMLButtonElement} */
  const btnToggleRightNav = document.querySelector(".cagov-toggle");
  if (!btnToggleRightNav) return;

  /** @type {HTMLButtonElement} */
  const btnCloseRightNav = document.querySelector(".close-cagov-global-menu");
  const regularHeader = document.querySelector("header");
  // Escape key event listener
  document.addEventListener("keydown", (e) => {
    if (navRightNavCont.classList.contains("visible")) {
      if (e.key === "Escape") {
        e.stopPropagation();
        closeMenu();
      }
    }
  });

  // Close menu on focusout (tabbing out) event
  navRightNavCont.addEventListener("focusout", (e) => {
    const child = /** @type {Node} **/ (e.relatedTarget);
    const parent = /** @type {Node} **/ (e.currentTarget);

    if (child && !parent.contains(child)) {
      closeMenu();
    }
  });

  // Button click open menu function
  const openMenu = () => {
    navRightNavCont.classList.add("visible");
    navRightNavCont.ariaHidden = null;
    document.body.classList.add("overflow-hidden");
    btnToggleRightNav.ariaExpanded = "true";
    // make links focusable
    // Hide all the website areas (add aria-hidden)
    regularHeader?.classList.add("nav-overlay");
    btnCloseRightNav.focus();
  };

  // Button click close menu function
  const closeMenu = () => {
    if (navRightNavCont.classList.contains("visible")) {
      navRightNavCont.classList.remove("visible");

      //Set focus only when close actually happens
      btnToggleRightNav.focus();
    }
    navRightNavCont.classList.add("not-visible");
    //setClosed();
    if (btnToggleRightNav.ariaExpanded !== "false") {
      btnToggleRightNav.ariaExpanded = "false";
    }
    // remove aria hidden for the rest of the site
    regularHeader?.classList.remove("nav-overlay");
    document.body.classList.remove("overflow-hidden");
  };

  // Button Click event
  btnToggleRightNav.addEventListener("click", openMenu);
  // Button Click event
  btnCloseRightNav.addEventListener("click", closeMenu);

  // on resize function (hide mobile nav)
  window.addEventListener("resize", closeMenu);
});

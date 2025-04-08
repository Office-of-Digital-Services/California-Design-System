const closeOtherMenus = new Event("close-other-menu");

class NavMenu extends HTMLElement {
  connectedCallback() {
    // Get layout and browser variables for later use.
    this.layout = this.closest("ca-layout");
    this.parentMenu = this.closest("ca-nav-menu ca-nav-menu");

    window.setTimeout(() => {
      const list = this.querySelector(":scope > ul");
      const menuLabel = this.querySelector(":scope > :is(a, span)");

      // If the menu's label is a link, preserve the link within the sub-menu.
      if (menuLabel?.nodeName === "A") {
        const listItem = document.createElement("li");
        listItem.append(menuLabel);
        list.prepend(listItem);
      }

      // Create a button for toggling the sub-menu open and closed.
      if (menuLabel !== null) {
        this.button = document.createElement("button");
        this.button.setAttribute("aria-expanded", "false");
        this.button.innerHTML = `<span>${menuLabel.innerHTML}</span><ca-icon glyph="right"></ca-icon>`;
        this.prepend(this.button);

        this.button.addEventListener("click", this.toggleEventHandler());
      }
    }, 1);
  }

  // Handle button clicks for opening/closing the menu.
  toggle() {
    const expanded = this.hasAttribute("expanded");

    if (expanded) {
      this.close();
    }

    if (!expanded) {
      this.open();
    }
  }

  // A click handler for button events.
  toggleEventHandler() {
    return (event) => {
      this.toggle();
    };
  }

  // Open the menu.
  open() {
    this.closeOtherMenus();

    // Now that this menu is open, we need to listen for any other menus.
    this.addEventListener("close-other-menu", this.otherMenuEventHandler());

    this.setAttribute("expanded", "");
    this.button.classList.add("active");
    this.button.setAttribute("aria-expanded", "true");

    const menuButtonIcon = this.button.querySelector("ca-icon");
    menuButtonIcon.setAttribute("glyph", "close");
  }

  // Close the menu.
  close() {
    this.removeEventListener("close-other-menu", this.otherMenuEventHandler());

    this.removeAttribute("expanded");
    this.button.classList.remove("active");
    this.button.setAttribute("aria-expanded", "false");

    const buttonIcon = this.button.querySelector("ca-icon");
    buttonIcon.setAttribute("glyph", "right");
  }

  // An event handler for reacting to the custom "close all menus" event.
  otherMenuEventHandler() {
    return (event) => {
      this.close();
    };
  }

  // Emit the custom "close all menus" event to all other menus.
  closeOtherMenus() {
    const otherMenus = [...document.querySelectorAll("ca-nav-menu")].filter(
      (el) => el !== this,
    );
    for (const el of document.querySelectorAll("ca-nav-menu")) {
      el.dispatchEvent(closeOtherMenus);
    }
  }
}

customElements.define("ca-nav-menu", NavMenu);

class NavMenu extends HTMLElement {
  connectedCallback() {
    // Get layout and browser variables for later use.
    this.layout = this.closest("ca-layout");

    window.setTimeout(() => {
      const list = this.querySelector(":scope > :is(ul, menu)");
      const summary = this.querySelector(':scope > [slot="summary"]');

      // If a button was already included, just use it.
      if (summary?.nodeName === "BUTTON") {
        this.button = summary;
      }

      // If there's no button, we need to create it.
      if (summary?.nodeName !== "BUTTON") {
        this.button = document.createElement("button");
        this.button.innerHTML = `<span>${summary.innerHTML}</span><ca-pic icon="down"></ca-pic>`;
        this.prepend(this.button);
      }

      // If the menu's label is a link, preserve the link within the sub-menu.
      if (summary?.nodeName === "A") {
        const listItem = document.createElement("li");
        listItem.append(summary);
        list.prepend(listItem);
      }

      // If the summary is a span, remove it. We just recreated it above.
      if (summary?.nodeName === "SPAN") {
        summary.remove();
      }

      const open = this.hasAttribute("open");

      this.button.setAttribute("aria-expanded", `${open}`);
      this.button.addEventListener("click", this.toggleEventHandler());
    }, 1);
  }

  // Handle button clicks for opening/closing the menu.
  toggle() {
    const open = this.hasAttribute("open");

    if (open) {
      this.close();
    }

    if (!open) {
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
    this.setAttribute("open", "");
    this.button.setAttribute("aria-expanded", "true");
  }

  // Close the menu.
  close() {
    this.removeAttribute("open");
    this.button.setAttribute("aria-expanded", "false");
  }
}

customElements.define("ca-menu", NavMenu);

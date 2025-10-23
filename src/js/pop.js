class Pop extends HTMLElement {
  connectedCallback() {
    window.setTimeout(() => {
      this.content = this.querySelector(":scope > [slot='pop-content']");
      this.button = this.querySelector(":scope > [slot='pop-button']");

      if (!this.button) {
        console.error("ca-pop: No button found.");
        return;
      }

      if (!this.content) {
        console.error("ca-pop: No content found.");
        return;
      }

      // If the pressable is not a button, we need to add semantics.
      if (this.button.nodeName !== "BUTTON") {
        this.button.setAttribute("role", "button");
        this.button.setAttribute("tabindex", "0");
      }

      const open = this.hasAttribute("open");

      this.button.setAttribute("aria-expanded", `${open}`);
      this.button.setAttribute("aria-pressed", `${open}`);
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
    this.button.setAttribute("aria-pressed", "true");
  }

  // Close the menu.
  close() {
    this.removeAttribute("open");
    this.button.setAttribute("aria-expanded", "false");
    this.button.setAttribute("aria-pressed", "false");
  }
}

customElements.define("ca-pop", Pop);

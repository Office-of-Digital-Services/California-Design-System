class Burger extends HTMLElement {
  connectedCallback() {
    // Get layout and browser variables for later use.
    this.layout = this.closest("ca-layout");
    this.layoutWidth = this.layout.offsetWidth;

    /* Some browsers need a tick to see current DOM contents of the custom element. */
    window.setTimeout(() => {
      this.header = this.layout.querySelector("header, .site-header");
      this.main = this.layout.querySelector("main");

      /* First, convert the burger link into a burger button. */
      const link = this.querySelector("a");
      this.button = document.createElement("button");
      this.button.classList.add("ca-button", "ca-button-burger");
      this.button.setAttribute("aria-expanded", "false");
      this.button.innerHTML = link.innerHTML;
      link.replaceWith(this.button);

      const header = this.layout.querySelector("header");
      const observer = new IntersectionObserver((entries) => {
        if (!this.hasAttribute("expanded")) {
          for (const entry of entries) {
            const intersecting = entry.isIntersecting;
            const scrollStatus = intersecting ? "initial" : "scrolled";
            this.setAttribute("position", scrollStatus);
            this.changeIcon();
          }
        }
      });

      observer.observe(header);

      this.button.addEventListener("click", this.toggleEventHandler());
      this.layoutResizeObserver = this.createLayoutResizeObserver();
    }, 1);
  }

  layoutFormat() {
    return this.layout.getAttribute("format");
  }

  createLayoutResizeObserver() {
    return new ResizeObserver(() => {
      const openAttribute = this.layout.getAttribute("burger");
      const isOpen = openAttribute === "open";
      const oldWidth = this.layoutWidth;
      const newWidth = this.layout.offsetWidth;

      // Set new layout width for later reference.
      this.layoutWidth = newWidth;

      // If the resize has gone to desktop size, kill the menu.
      if (isOpen && newWidth >= 1024) {
        this.close();
        return;
      }

      // If the resize is truly a resize, rapidly close and reopen the menu.
      // This resets the positioning of the layout elements as needed.
      // Kind of a hack but okay for now.
      if (isOpen && oldWidth !== newWidth) {
        this.close();
        this.open();
      }
    });
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

  bodyClickEventHandler(event) {
    return (event) => {
      this.close();
    };
  }

  changeIcon() {
    let icon;

    const expanded = this.hasAttribute("expanded");

    if (expanded) {
      icon = "close";
    }

    if (!expanded) {
      const position = this.getAttribute("position");
      icon = position === "scrolled" ? "bear-menu" : "pancakes-menu";
    }

    const buttonIcon = this.button.querySelector("ca-icon");
    buttonIcon.setAttribute("icon", icon);
  }

  // Open the menu.
  open() {
    const headerHeight = this.header.offsetHeight;
    this.main.style.marginBlockStart = `${headerHeight}px`;

    this.layout.setAttribute("burger", "open");
    this.setAttribute("expanded", "");
    this.button.setAttribute("aria-expanded", "true");

    this.changeIcon();

    const content = [...this.layout.querySelectorAll("main, footer")];
    for (const element of content) {
      element.addEventListener("click", this.bodyClickEventHandler());
    }

    this.layoutResizeObserver.observe(this.layout);
  }

  // Close the menu.
  close() {
    this.main.style.removeProperty("margin-block-start");

    this.removeAttribute("expanded");
    this.layout.setAttribute("burger", "closed");
    this.button.setAttribute("aria-expanded", "false");

    this.changeIcon();

    const content = [...this.layout.querySelectorAll("main, footer")];
    for (const element of content) {
      element.removeEventListener("click", this.bodyClickEventHandler());
    }

    this.layoutResizeObserver.disconnect();
  }
}

customElements.define("ca-burger", Burger);

class SiteMenu extends HTMLElement {
  connectedCallback() {
    // Get layout and browser variables for later use.
    this.layout = this.closest("ca-layout");
    this.layoutWidth = this.layout.offsetWidth;

    /* Some browsers need a tick to see current DOM contents of the custom element. */
    window.setTimeout(() => {
      /* First, convert the burger link into a burger button. */
      const link = this.querySelector("a");
      this.button = document.createElement("button");
      this.button.classList.add("burger");
      this.button.setAttribute("aria-expanded", "false");
      this.button.innerHTML = link.innerHTML;
      link.replaceWith(this.button);

      const header = this.layout.querySelector("header");
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const intersecting = entry.isIntersecting;
          const scrollStatus = intersecting ? "initial" : "scrolled";
          this.setAttribute("position", scrollStatus);
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
      const openAttribute = this.layout.getAttribute("site-menu");
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
  toggleEventHandler(event) {
    return (event) => {
      this.toggle();
    };
  }

  bodyClickEventHandler(event) {
    return (event) => {
      this.close();
    };
  }

  // Open the menu.
  open() {
    this.layout.setAttribute("site-menu", "open");
    this.applyTopOffsets();

    this.setAttribute("expanded", "");
    this.button.setAttribute("aria-expanded", "true");

    const buttonIcon = this.button.querySelector("ca-icon");
    buttonIcon.setAttribute("glyph", "close");

    const content = [...this.layout.querySelectorAll("main, footer")];
    for (const element of content) {
      element.addEventListener("click", this.bodyClickEventHandler());
    }

    this.layoutResizeObserver.observe(this.layout);
  }

  // Close the menu.
  close() {
    this.removeAttribute("expanded");
    this.removeTopOffsets();

    this.layout.setAttribute("site-menu", "closed");
    this.button.setAttribute("aria-expanded", "false");

    const buttonIcon = this.button.querySelector("ca-icon");
    buttonIcon.setAttribute("glyph", "bear-menu");

    const content = [...this.layout.querySelectorAll("main, footer")];
    for (const element of content) {
      element.removeEventListener("click", this.bodyClickEventHandler());
    }

    this.layoutResizeObserver.disconnect();
  }

  // Apply inline styles to layout elements to ensure they look good in expanded menu.
  applyTopOffsets() {
    let depth = 0;
    const elements = ["ca-site-menu", "ca-utility-bar", "header"];
    for (const element of elements) {
      const el = this.layout.querySelector(element);
      if (el) {
        const top = el.offsetTop;
        el.style.top = `${top}px`;

        if (element === "ca-site-menu" || element === "header") {
          depth += el.offsetHeight;
        }
      }
    }

    const priorityBar = this.layout.querySelector("ca-priority-bar");
    if (priorityBar) {
      const priorityBarTop = depth - 1;
      priorityBar.style.top = `${priorityBarTop}px`;
      depth += priorityBar.offsetHeight;
    }

    const pageBar = this.layout.querySelector("ca-page-bar");
    if (pageBar) {
      const pageBarTop = depth - 1;
      pageBar.style.top = `${pageBarTop}px`;
      const pageBarHeight = window.innerHeight - depth + 1;
      pageBar.style.height = `${pageBarHeight}px`;
    }
  }

  // Remove inline styles from layout elements.
  removeTopOffsets() {
    const elements = [
      "ca-site-menu",
      "ca-priority-bar",
      "ca-utility-bar",
      "header",
      "ca-page-bar",
    ];
    for (const element of elements) {
      const el = this.layout.querySelector(element);
      if (el) {
        el.style.removeProperty("top");
        el.style.removeProperty("height");
      }
    }
  }
}

customElements.define("ca-site-menu", SiteMenu);

class SiteMenu extends HTMLElement {
  connectedCallback() {
    // Get layout and browser variables for later use.
    const layout = this.closest("ca-layout");
    const format = layout.getAttribute("format");
    const width = window.innerWidth;

    /* Some browsers need a tick to see current DOM contents of the custom element. */
    /* Without timeout, we'll append instead of replace. */
    window.setTimeout(() => {
      /* First, convert the burger link into a burger button. */
      const link = this.querySelector("a");
      const button = document.createElement("button");
      button.innerHTML = link.innerHTML;
      link.replaceWith(button);

      const header = layout.querySelector("header");
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const intersecting = entry.isIntersecting;
          const scrollStatus = intersecting ? "initial" : "scrolled";
          this.setAttribute("position", scrollStatus);
        }
      });

      observer.observe(header);
    }, 1);
  }
}

customElements.define("ca-site-menu", SiteMenu);

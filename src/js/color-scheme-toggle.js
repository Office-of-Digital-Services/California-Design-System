class ColorSchemeToggle extends HTMLElement {
  storageKey = "color-scheme-preference";

  schemes = {
    light: "light",
    dark: "dark",
  };

  scheme = this.schemes.light;

  connectedCallback() {
    this.setInitialScheme();

    window.setTimeout(() => {
      this.button = this.querySelector("button");
      this.icon = this.querySelector("ca-icon");

      this.applyScheme();

      this.button.addEventListener("click", () => {
        this.scheme = this.getOppositeScheme();
        this.applyScheme();
      });
    }, 1);
  }

  /**
   * Gets the opposite of the currently set scheme. Useful for toggles.
   * @returns The opposite scheme, as a string.
   */
  getOppositeScheme() {
    return this.scheme === this.schemes.light
      ? this.schemes.dark
      : this.schemes.light;
  }

  /**
   * Gets the initial color-scheme based on combination of mark-up and preferences.
   */
  setInitialScheme() {
    // If user has already used this toggle, honor that choice.
    if (localStorage.getItem(this.storageKey)) {
      this.scheme = localStorage.getItem(this.storageKey);
      return;
    }

    // If not, then check the mark-up for a manually "forced" scheme.
    const root = document.querySelector("html");
    const manualPreset = root.getAttribute("data-color-scheme");
    if (Object.values(this.schemes).includes(manualPreset)) {
      this.scheme = manualPreset;
      return;
    }

    // Finally, if still undetermined, check user agent for the system preference.
    this.scheme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? this.schemes.dark
      : this.schemes.light;
  }

  /**
   * Apply `this.scheme` to the page, make it real.
   */
  applyScheme() {
    localStorage.setItem(this.storageKey, this.scheme);

    const root = document.querySelector("html");
    root.setAttribute("data-color-scheme", this.scheme);

    const newsymbol =
      this.scheme === this.schemes.light ? "light-mode" : "dark-mode";
    this.icon.setAttribute("symbol", newsymbol);
  }
}

customElements.define("ca-color-scheme-toggle", ColorSchemeToggle);

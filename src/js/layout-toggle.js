class LayoutToggle extends HTMLElement {
  shadowHtml = /* html */ `
		<style>
			:host {
				font-size: var(--text-size-sm);
				margin: 0 1rem;
			}
			button {
				all: unset;
				display: flex;
				gap: .75rem;
				align-items: center;
				padding: .25rem 1rem;
				block-size: 1.5rem;
				inline-size: auto;
				font-size: .8rem;
				color: var(--primary-100);
				border: 1px solid var(--primary-100);
				border-radius: var(--border-radius);
				box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
			}
			div.icon-wrap {
				position: relative;
				width: .75rem;
				height: .75rem;
			}
			svg {
				position: absolute;
				display: inline-block;
				transition: opacity .3s, transform .3s;
			}
			svg[hidden] {
				transform: rotate(-180deg);
				opacity: 0;
			}
			svg[data-open]:not([hidden]) {
				transform: translateY(3px);
			}
			fieldset {
				all: unset;
				display: flex;
				flex-direction: column;
				gap: .25rem;
				padding: .5rem;
			}
			div.form-wrap {
				position: relative;
			}
			form {
				position: absolute;
				display: flex;
				flex-direction: row;
				gap: 1rem;
				background-color: var(--primary-background-40);
				padding: 1rem;
				top: 100%;
				right: 0;
				box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
				border-radius: var(--border-radius);
				z-index: 100;
			}
			form > div {
				width: 12rem;
			}
			form[hidden] {
				display: none;
			}
			.disabled {
				opacity: 66%;
				pointer-events: none;
			}
		</style>
		<button>
			<span>Dev</span>
			<div class="icon-wrap">
				<svg data-open xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7">
					<path 
						d="M6.00005 6.97499C5.86672 6.97499 5.74172 6.95415 5.62505 6.91249C5.50838 6.87082 5.40005 6.79999 5.30005 6.69999L0.700049 2.09999C0.516715 1.91665 0.425049 1.68332 0.425049 1.39999C0.425049 1.11665 0.516715 0.883321 0.700049 0.699988C0.883382 0.516654 1.11672 0.424988 1.40005 0.424988C1.68338 0.424988 1.91672 0.516654 2.10005 0.699988L6.00005 4.59999L9.90005 0.699988C10.0834 0.516654 10.3167 0.424988 10.6 0.424988C10.8834 0.424988 11.1167 0.516654 11.3 0.699988C11.4834 0.883321 11.575 1.11665 11.575 1.39999C11.575 1.68332 11.4834 1.91665 11.3 2.09999L6.70005 6.69999C6.60005 6.79999 6.49172 6.87082 6.37505 6.91249C6.25838 6.95415 6.13338 6.97499 6.00005 6.97499Z" 
						fill="currentColor"
					/>
				</svg>
				<svg data-close xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" hidden>
					<path 
						d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" 
						fill="currentColor"
					/>
				</svg>
			</div>
		</button>
		<div class="form-wrap">
			<form hidden>
				<div>
					<fieldset id="include">
						<legend>Include</legend>
						<label><input type="checkbox" name="site-menu" value="site-menu" /> Site menu</label>
						<label><input type="checkbox" name="site-logo" value="site-logo" /> Site logo</label>
						<label><input type="checkbox" name="header" value="header" /> Header</label>
						<label><input type="checkbox" name="search" value="search" /> Search</label>
						<label><input type="checkbox" name="utility-nav" value="utility-nav" /> Utility nav</label>
						<label><input type="checkbox" name="content-nav" value="content-nav" /> Content nav</label>
						<label><input type="checkbox" name="main" value="main" /> Main</label>
						<label><input type="checkbox" name="footer" value="footer" /> Footer</label>
					</fieldset>
				</div>
				<div>
					<fieldset id="layout">
						<legend>Layout</legend>
						<label><input type="radio" name="layout" value="eureka" /> Eureka</label>
						<label><input type="radio" name="layout" value="horizon" /> Horizon</label>
						<label><input type="radio" name="layout" value="skyline" /> Skyline</label>
					</fieldset>
					<fieldset id="theme">
						<legend>Theme</legend>
						<label><input type="radio" name="theme" value="coastal" /> Coastal</label>
						<label><input type="radio" name="theme" value="desert" /> Desert</label>
						<label><input type="radio" name="theme" value="mountain" /> Mountain</label>
						<label><input type="radio" name="theme" value="valley" /> Valley</label>
					</fieldset>
					<fieldset id="accent">
						<legend>Accent</legend>
						<label><input type="radio" name="accent" value="primary-left" /> Primary, left</label>
						<label><input type="radio" name="accent" value="primary-center" /> Primary, center</label>
						<label><input type="radio" name="accent" value="primary-solid" /> Primary, solid</label>
						<label><input type="radio" name="accent" value="secondary-left" /> Secondary, left</label>
						<label><input type="radio" name="accent" value="secondary-center" /> Secondary, center</label>
						<label><input type="radio" name="accent" value="secondary-solid" /> Secondary, solid</label>
					</fieldset>
					<fieldset id="corners">
						<legend>Corner</legend>
						<label><input type="radio" name="corners" value="soft" /> Soft</label>
						<label><input type="radio" name="corners" value="sharp" /> Sharp</label>
						<label><input type="radio" name="corners" value="round" /> Round</label>
					</fieldset>
				</div>
			</form>
		</div>
	`;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  closeMenu(button, form) {
    form.toggleAttribute("hidden");
    button.querySelector("svg[data-open]").toggleAttribute("hidden");
    button.querySelector("svg[data-close]").toggleAttribute("hidden");
  }

  setupIncludeToggle(layout, toggleName, layoutElementSelector) {
    const toggle = this.shadowRoot.querySelector(`input[name="${toggleName}"]`);
    const layoutElement = layout.querySelector(layoutElementSelector);

    // If this layout element is not in the HTML, hide the control and abort.
    if (layoutElement === null) {
      toggle.closest("label").classList.add("disabled");
      return;
    }

    const layoutElementAlreadyEnabled = !layoutElement.hasAttribute("hidden");
    if (layoutElementAlreadyEnabled) {
      toggle.checked = true;
    }
    toggle.addEventListener("change", (event) => {
      if (event.target.checked) {
        layoutElement.removeAttribute("hidden");
      } else {
        layoutElement.setAttribute("hidden", "");
      }
    });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.shadowHtml;
    const head = document.querySelector("head");
    const button = this.shadowRoot.querySelector("button");
    const form = this.shadowRoot.querySelector("form");
    const layout = this.closest("ca-layout");

    // Expand menu
    button.addEventListener("click", (event) => {
      this.closeMenu(button, form);
    });

    // Set initial layout
    const layoutFieldset = this.shadowRoot.querySelector("fieldset#layout");
    const initialFormat = layout.getAttribute("format") || "eureka";
    layoutFieldset
      .querySelector(`input[value="${initialFormat}"]`)
      .setAttribute("checked", "");
    // Change layout
    layoutFieldset.addEventListener("change", (event) => {
      layout.setAttribute("format", event.target.value);
      this.closeMenu(button, form);
    });

    // Set initial accent
    const accentFieldset = this.shadowRoot.querySelector("fieldset#accent");
    const initialAccent = layout.getAttribute("data-accent") || "primary-left";
    accentFieldset
      .querySelector(`input[value="${initialAccent}"]`)
      .setAttribute("checked", "");
    // Change accent
    accentFieldset.addEventListener("change", (event) => {
      layout.setAttribute("data-accent", event.target.value);
    });

    // Set initial corners
    const cornersFieldset = this.shadowRoot.querySelector("fieldset#corners");
    const initialCorners = layout.getAttribute("data-corners") || "soft";
    cornersFieldset
      .querySelector(`input[value="${initialCorners}"]`)
      .setAttribute("checked", "");
    // Change accent
    cornersFieldset.addEventListener("change", (event) => {
      layout.setAttribute("data-corners", event.target.value);
    });

    // Set initial theme
    const themeFieldset = this.shadowRoot.querySelector("fieldset#theme");
    const initialTheme = head
      .querySelector("link[data-theme]:last-of-type")
      .getAttribute("data-theme");
    themeFieldset
      .querySelector(`input[value="${initialTheme}"]`)
      .setAttribute("checked", "");
    // Change theme
    themeFieldset.addEventListener("change", (event) => {
      const desiredTheme = head.querySelector(
        `link[data-theme="${event.target.value}"]`,
      );
      head.appendChild(desiredTheme);
    });

    window.setTimeout(() => {
      this.setupIncludeToggle(layout, "site-menu", "ca-site-menu");
      this.setupIncludeToggle(layout, "site-logo", "ca-site-logo");
      this.setupIncludeToggle(layout, "header", "header");
      this.setupIncludeToggle(layout, "search", "search");
      this.setupIncludeToggle(layout, "utility-nav", "nav#utility-nav");
      this.setupIncludeToggle(layout, "content-nav", "nav#content-nav");
      this.setupIncludeToggle(layout, "main", "main");
      this.setupIncludeToggle(layout, "footer", "footer");
    }, 1);
  }
}

customElements.define("ca-layout-toggle", LayoutToggle);

class ThemeToggle extends HTMLElement {
  shadowHtml = `
		<style>
			select {
				color: var(--primary-110);
				background-color: var(--primary-background-10);
				padding: .1rem;
				border-color: var(--primary-110);
			}
		</style>
		<select title="Switch theme" aria-label="Change color theme">
			<option value="coastal">Coastal blue</option>
			<option value="desert">Desert tan</option>
			<option value="mountain">Mountain gray</option>
			<option value="valley">Valley green</option>
		</select>
	`;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.shadowHtml;
    const select = this.shadowRoot.querySelector("select");
    const head = document.querySelector("head");

    select.addEventListener("change", (event) => {
      const desiredTheme = head.querySelector(
        `link[data-theme="${event.target.value}"]`,
      );
      head.appendChild(desiredTheme);
    });
  }
}

customElements.define("ca-theme-toggle", ThemeToggle);

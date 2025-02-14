class AccentToggle extends HTMLElement {
  shadowHtml = `
		<style>
			select {
				color: var(--primary-110);
				background-color: var(--primary-background-10);
				padding: .1rem;
				border-color: var(--primary-110);
			}
		</style>
		<select title="Switch accent color" aria-label="Change accent color">
			<option value="primary-left">Primary, left</option>
			<option value="primary-center">Primary, centered</option>
			<option value="primary-solid">Primary, solid</option>
			<option value="secondary-left">Secondary, left</option>
			<option value="secondary-center">Secondary, centered</option>
			<option value="secondary-solid">Secondary, solid</option>
		</select>
	`;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = this.shadowHtml;
    const select = this.shadowRoot.querySelector("select");
    const layout = this.closest("ca-layout");

    select.addEventListener("change", (event) => {
      layout.setAttribute("data-accent", event.target.value);
    });
  }
}

customElements.define("ca-accent-toggle", AccentToggle);

class LayoutToggle extends HTMLElement {
  shadowHtml = `
		<style>
			select {
				color: var(--primary-110);
				background-color: var(--primary-background-10);
				padding: .1rem;
				border-color: var(--primary-110);
			}
		</style>
		<select title="Switch layout" aria-label="Change layout format">
			<option value="eureka">Eureka</option>
			<option value="horizon">Horizon</option>
			<option value="skyline">Skyline</option>
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
      layout.setAttribute("format", event.target.value);
    });
  }
}

customElements.define("ca-layout-toggle", LayoutToggle);

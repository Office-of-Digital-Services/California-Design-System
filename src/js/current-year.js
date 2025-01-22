class CurrentYear extends HTMLElement {
	connectedCallback() {
		const currentDate = new Date();
		/* Some browsers need a tick to see current DOM contents of the custom element. */
		/* Without timeout, we'll append instead of replace. */
		window.setTimeout(() => {
			this.innerText = currentDate.getFullYear();
		}, 1);
	}
}

customElements.define("ca-current-year", CurrentYear);

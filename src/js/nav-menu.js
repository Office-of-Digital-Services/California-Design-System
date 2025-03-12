class NavMenu extends HTMLElement {
  connectedCallback() {
    // Get layout and browser variables for later use.
    const layout = this.closest("ca-layout");
		const parentMenu = this.closest("ca-nav-menu ca-nav-menu");

    window.setTimeout(() => {
			const list = this.querySelector(":scope > ul");
			const menuLabel = this.querySelector(":scope > :is(a, span)");

			// If the menu's label is a link, preserve the link within the sub-menu.
			if (menuLabel?.nodeName === "A") {
				const listItem = document.createElement("li");
				listItem.append(menuLabel);
				list.prepend(listItem);
			}

			// Create a button for toggling the sub-menu open and closed.
			if (menuLabel !== null) {
				const menuButton = document.createElement("button");
				menuButton.setAttribute("aria-expanded", "false");
				menuButton.innerHTML = `<span>${menuLabel.innerHTML}</span><ca-icon name="right"></ca-icon>`;
				this.prepend(menuButton);

				menuButton.addEventListener("click", (event) => {
					menuButton.classList.toggle("active");
					const expanded = menuButton.getAttribute("aria-expanded");
					const wasExpanded = (expanded === "true");

					const menuButtonIcon = menuButton.querySelector("ca-icon");

					this.toggleAttribute("expanded");
					menuButtonIcon.setAttribute("name", (wasExpanded ? "right": "close"));
					menuButton.setAttribute("aria-expanded", (wasExpanded ? "false" : "true"));
				});
			}
    }, 1);
  }
}

customElements.define("ca-nav-menu", NavMenu);

// JavaScript Document

//// EUREKA DESIGN SYSTEM CODE TOOL JS α0.2.8 ////
//////////////////////////////////////////////////

/// BEGIN ARROW ROTATION ///
////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("details").forEach((details) => {
    // Set initial rotation state based on whether details is open
    let arrow = details.querySelector(".arrow");
    if (arrow) {
      arrow.style.transform = details.open ? "rotate(180deg)" : "rotate(0deg)";
    }

    // Add event listener for each <details>
    details.addEventListener("toggle", function () {
      let arrow = this.querySelector(".arrow");
      if (arrow) {
        arrow.style.transform = this.open ? "rotate(180deg)" : "rotate(0deg)";
      }
    });
  });
});

/// END ARROW ROTATION ///
//////////////////////////

/// Tabs (HTML, CSS, JS) for Code Snippet ///
/////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  // Find all tab groups
  document.querySelectorAll(".tab-container").forEach((tabContainer) => {
    const tabButtons = tabContainer.querySelectorAll(".tablinks");
    const tabContents = tabContainer.querySelectorAll(".tabcontent");

    // Add event listeners to tab buttons
    tabButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        openTab(event, button.dataset.code, tabContainer);
      });
    });

    // Open the first tab in this group by default
    if (tabButtons.length > 0) {
      tabButtons[0].click(); // Simulate a click to open the first tab
    }
  });
});

function openTab(evt, codeType, tabContainer) {
  const tabButtons = tabContainer.querySelectorAll(".tablinks");
  const tabContents = tabContainer.querySelectorAll(".tabcontent");

  // Hide all tab contents in this group
  tabContents.forEach((content) => {
    content.style.display = "none";
  });

  // Remove "active" class from all buttons in this group
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  // Show the selected tab content
  const selectedTab = tabContainer.querySelector(`#${codeType}`);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }

  // Add "active" class to the clicked tab
  if (evt && evt.currentTarget) {
    evt.currentTarget.classList.add("active");
  }
}
/// END TABS ///
////////////////

/// BUILDING BLOCK OPTION TOGGLER ///
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  // Open the first <details> element by default
  const firstDetails = document.querySelector("details");
  if (firstDetails) {
    firstDetails.setAttribute("open", "true");
  }

  // Add event listeners to all <details> elements
  document.querySelectorAll("details").forEach((details) => {
    details.addEventListener("click", function () {
      // Get the target output container ID from the data-target attribute
      const targetId = this.getAttribute("data-target");
      const outputContainer = document.getElementById(targetId);

      // Hide all output containers first
      document.querySelectorAll(".output-container").forEach((item) => {
        item.style.display = "none";
      });

      // Show the selected output container
      if (outputContainer) {
        outputContainer.style.display = "block";
      }
    });
  });
});

/// END TOGGLER ///
///////////////////

/// BEGIN COPY BUTTON ///
/////////////////////////
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const container = this.closest(".copy-container");
      const textElement = container.querySelector(".textToCopy");
      const successMessage = container.querySelector(".copy-success");

      if (textElement) {
        navigator.clipboard
          .writeText(textElement.textContent)
          .then(() => {
            // Use class instead of modifying display
            successMessage.classList.add("show");

            // Remove after 2 seconds
            setTimeout(() => {
              successMessage.classList.remove("show");
            }, 2000);
          })
          .catch((err) => {
            console.error("Failed to copy text: ", err);
          });
      }
    });
  });
});
/// END COPY BUTTON ///
///////////////////////

/// BEGIN CODE LINTING FUNCTION FOR <PRE> CONTENT ///
/////////////////////////////////////////////////////

function encodeHTML(str) {
  return str.replace(/[&<>"']/g, function (match) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[match];
  });
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".lint").forEach((element) => {
    if (element.childNodes.length) {
      element.childNodes.forEach((node) => {
        if (node.nodeType === 3) {
          // Text nodes only
          node.nodeValue = encodeHTML(node.nodeValue);
        }
      });
    }
  });
});
/// END CODE LINTING FUNCTION FOR <PRE> CONTENT ///
///////////////////////////////////////////////////

/// BEGIN LIGHT/DARK TOGGLE AND <DETAILS> REMAINS OPEN FUNCTION ///
///////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const colorMode = document.querySelector("ca-code-tool").dataset.colorScheme;
  const darkModeButton = document.getElementById("dark-mode-svg");
  const lightModeButton = document.getElementById("light-mode-svg");
  const element = document.querySelector(".output-container").children[0];

  console.log(colorMode);
  if (colorMode === "dark") {
    darkModeButton.style.display = "none";
    element.dataset.colorSchemeElement = "dark";
  } else {
    lightModeButton.style.display = "none";
    element.dataset.colorSchemeElement = "light";
  }
});

const toggleColor = () => {
  const element = document.querySelectorAll(".output-container");
  const darkModeButton = document.getElementById("dark-mode-svg");
  const lightModeButton = document.getElementById("light-mode-svg");
  let openDetailIndex;

  element.forEach((el) => {
    const elementChild = el.children[0];
    let elementColorScheme = elementChild.dataset.colorSchemeElement;

    elementColorScheme === "dark"
      ? (elementChild.dataset.colorSchemeElement = "light")
      : (elementChild.dataset.colorSchemeElement = "dark");

    //
    // Setting SVG attributes doesn't seem to be working with JS
    // Attributes are being changed in the DOM, but icon is disappearing
    //
    if (elementColorScheme === "dark") {
      elementChild.dataset.colorSchemeElement = "light";
      lightModeButton.style.display = "none";
      darkModeButton.style.display = "block";
    } else {
      elementChild.dataset.colorSchemeElement = "dark";
      lightModeButton.style.display = "block";
      darkModeButton.style.display = "none";
    }
  });
};
/// END LIGHT/DARK TOGGLE AND <DETAILS> REMAINS OPEN ///
////////////////////////////////////////////////////////

/// BEGIN NAV MENU ///
//////////////////////
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
          const wasExpanded = expanded === "true";

          const menuButtonIcon = menuButton.querySelector("ca-icon");

          this.toggleAttribute("expanded");
          menuButtonIcon.setAttribute("name", wasExpanded ? "right" : "close");
          menuButton.setAttribute(
            "aria-expanded",
            wasExpanded ? "false" : "true"
          );
        });
      }
    }, 1);
  }
}

customElements.define("ca-nav-menu", NavMenu);

class SiteMenu extends HTMLElement {
  connectedCallback() {
    // Get layout and browser variables for later use.
    const layout = this.closest("ca-layout");
    const format = layout.getAttribute("format");
    const width = window.innerWidth;

    /* Some browsers need a tick to see current DOM contents of the custom element. */
    window.setTimeout(() => {
      /* First, convert the burger link into a burger button. */
      const link = this.querySelector("a");
      const button = document.createElement("button");
      button.setAttribute("aria-expanded", "false");
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

      button.addEventListener("click", (event) => {
        const expanded = button.getAttribute("aria-expanded");
        const wasExpanded = expanded === "true";

        const buttonIcon = button.querySelector("ca-icon");

        this.toggleAttribute("expanded");
        buttonIcon.setAttribute("name", wasExpanded ? "bear-menu" : "close");
        button.setAttribute("aria-expanded", wasExpanded ? "false" : "true");
      });
    }, 1);
  }
}

customElements.define("ca-site-menu", SiteMenu);

/// END NAV MENU ///
////////////////////

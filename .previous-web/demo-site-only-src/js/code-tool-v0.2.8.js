// JavaScript Document

//// EUREKA DESIGN SYSTEM CODE TOOL JS α0.2.8 ////
//////////////////////////////////////////////////

/// BEGIN ARROW ROTATION ///
////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  for (const details of document.querySelectorAll("details")) {
    // Set initial rotation state based on whether details is open
    const arrow = details.querySelector(".arrow");
    if (arrow) {
      arrow.style.transform = details.open ? "rotate(180deg)" : "rotate(0deg)";
    }

    // Add event listener for each <details>
    details.addEventListener("toggle", function () {
      const arrow = this.querySelector(".arrow");
      if (arrow) {
        arrow.style.transform = this.open ? "rotate(180deg)" : "rotate(0deg)";
      }
    });
  }
});

/// END ARROW ROTATION ///
//////////////////////////

/// Tabs (HTML, CSS, JS) for Code Snippet ///
/////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  // Find all tab groups
  for (const tabContainer of document.querySelectorAll(".tab-container")) {
    const tabButtons = tabContainer.querySelectorAll(".tablinks");
    const tabContents = tabContainer.querySelectorAll(".tabcontent");

    // Add event listeners to tab buttons
    for (const button of tabButtons) {
      button.addEventListener("click", (event) => {
        openTab(event, button.dataset.code, tabContainer);
      });
    }

    // Open the first tab in this group by default
    if (tabButtons.length > 0) {
      tabButtons[0].click(); // Simulate a click to open the first tab
    }
  }
});

function openTab(evt, codeType, tabContainer) {
  const tabButtons = tabContainer.querySelectorAll(".tablinks");
  const tabContents = tabContainer.querySelectorAll(".tabcontent");

  // Hide all tab contents in this group
  for (const content of tabContents) {
    content.style.display = "none";
  }

  // Remove "active" class from all buttons in this group
  for (const button of tabButtons) {
    button.classList.remove("active");
  }

  // Show the selected tab content
  const selectedTab = tabContainer.querySelector(`#${codeType}`);
  if (selectedTab) {
    selectedTab.style.display = "block";
  }

  // Add "active" class to the clicked tab
  if (evt?.currentTarget) {
    evt.currentTarget.classList.add("active");
  }
}
/// END TABS ///
////////////////

/// BUILDING BLOCK OPTION TOGGLER ///
/////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  // Open the first <details> element by default
  const firstDetails = document.querySelector("details");
  if (firstDetails) {
    firstDetails.setAttribute("open", "true");
  }

  // Add event listeners to all <details> elements
  for (details of document.querySelectorAll("details")) {
    details.addEventListener("click", function () {
      // Get the target output container ID from the data-target attribute
      const targetId = this.getAttribute("data-target");
      const outputContainer = document.getElementById(targetId);

      // Hide all output containers first
      for (const item of document.querySelectorAll(".output-container")) {
        item.style.display = "none";
      }

      // Show the selected output container
      if (outputContainer) {
        outputContainer.style.display = "block";
      }
    });
  }
});

/// END TOGGLER ///
///////////////////

/// BEGIN COPY BUTTON ///
/////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  for (const button of document.querySelectorAll(".copy-btn")) {
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
  }
});
/// END COPY BUTTON ///
///////////////////////

/// BEGIN CODE LINTING FUNCTION FOR <PRE> CONTENT ///
/////////////////////////////////////////////////////

function encodeHTML(str) {
  return str.replace(
    /[&<>"']/g,
    (match) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[match],
  );
}

document.addEventListener("DOMContentLoaded", () => {
  for (const element of document.querySelectorAll(".lint")) {
    if (element.childNodes.length) {
      for (const node of element.childNodes) {
        if (node.nodeType === 3) {
          // Text nodes only
          node.nodeValue = encodeHTML(node.nodeValue);
        }
      }
    }
  }
});
/// END CODE LINTING FUNCTION FOR <PRE> CONTENT ///
///////////////////////////////////////////////////

/// BEGIN LIGHT/DARK TOGGLE AND <DETAILS> REMAINS OPEN FUNCTION ///
///////////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const colorMode =
    document.querySelector("ca-code-tool")?.dataset?.colorScheme;
  const darkModeButton = document.getElementById("dark-mode-svg");
  const lightModeButton = document.getElementById("light-mode-svg");
  const element = document.querySelector(".output-container")?.children[0];

  // console.log(colorMode);
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

  for (const el of element) {
    const elementChild = el.children[0];
    let elementColorScheme = elementChild.dataset.colorSchemeElement;

    elementColorScheme = elementColorScheme === "dark" ? "light" : "dark";

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
  }
};
/// END LIGHT/DARK TOGGLE AND <DETAILS> REMAINS OPEN ///
////////////////////////////////////////////////////////

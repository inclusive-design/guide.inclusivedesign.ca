"use strict";

const toggleExpansion = (element, state) => {
    let isExpanded = element.getAttribute("aria-expanded") === "true" ? true : false;
    state = typeof(state) !== "undefined" ? state : !isExpanded;

    element.setAttribute("aria-expanded", state ? "true" : "false");
    return state;
};

const menu = (container, button = "button") => {
    let menu = document.querySelector(container);

    if (!menu) {
        throw new Error(`No element found for container selector: ${container}`);
    }

    let btn = menu.querySelector(button);

    if (!btn) {
        throw new Error(`No element found for button selector: ${button}`);
    }

    // Close the menu when focus is moved away from the menu
    menu.addEventListener("focusout", (event) => {
        if (!menu.contains(event.relatedTarget)) {
            toggleExpansion(btn, false);
        }
    });

    // Close the menu when the "Escape" key is pressed and the menu has focus. Shifts focus back to the button.
    menu.addEventListener("keyup", (event) => {
        if (event.code === "Escape") {
            toggleExpansion(btn, false);
            btn.focus();
        }
    });

    // Toggle expansion of menu when button is clicked
    btn.addEventListener("click", () => {
        toggleExpansion(btn);
    });
};

menu(".idg-language-picker");
menu(".idg-mobile-nav");

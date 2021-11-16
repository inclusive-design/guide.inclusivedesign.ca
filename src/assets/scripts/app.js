"use strict";

const menu = {};

/**
 * Toggle's the aria-expanded state of an element.
 *
 * @param {DOMNode} element - the DOM Node to toggle the aria-expanded state on.
 * @param {Boolean} [state] - (optional) explicit state to set aria-expanded to.
 */
menu.toggleExpansion = (element, state) => {
    let isExpanded = element.getAttribute("aria-expanded") === "true" ? true : false;
    state = typeof(state) !== "undefined" ? state : !isExpanded;

    element.setAttribute("aria-expanded", state ? "true" : "false");
};

/**
 * Initializes a menu widget.
 *
 * @param {String} container - A CSS selector for the menu's container.
 * @param {String} [button] - (optional) A CSS slector for the menu's button. Defaults to "button".
 * @throws {Exception} - if no element is found for the container selector.
 * @throws {Exception} - if no element is found for the button selector within the container element.
 */
menu.init = (container, button = "button") => {
    let menuContainer = document.querySelector(container);

    if (!menuContainer) {
        throw new Error(`No element found for container selector: ${container}`);
    }

    let btn = menuContainer.querySelector(button);

    if (!btn) {
        throw new Error(`No element found for button selector: ${button}`);
    }

    // Close the menu when focus is moved away from the menu
    menuContainer.addEventListener("focusout", (event) => {
        if (!menuContainer.contains(event.relatedTarget)) {
            menu.toggleExpansion(btn, false);
        }
    });

    // Close the menu when clicking outside of it.
    // This is needed due to Safari not applying focus to clicked inputs.
    // https://bugs.webkit.org/show_bug.cgi?id=22261
    document.body.addEventListener("click", (event) => {
        if (!menuContainer.contains(event.target)) {
            menu.toggleExpansion(btn, false);
        }
    });

    // Close the menu when the "Escape" key is pressed and the menu has focus. Shifts focus back to the button.
    menuContainer.addEventListener("keyup", (event) => {
        if (event.code === "Escape") {
            menu.toggleExpansion(btn, false);
            btn.focus();
        }
    });

    // Toggle expansion of menu when button is clicked
    btn.addEventListener("click", () => {
        menu.toggleExpansion(btn);
    });
};

// initialize the language picker
menu.init(".idg-language-picker");

// initialize the mobile navigation menu
menu.init(".idg-menu-nav");

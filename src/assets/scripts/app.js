"use strict";

// Menu
jQuery("#menu").menu({
    position: {my: "right top", at: "right bottom"},
    icons: {submenu: "ui-icon-blank"},
    // Remove the anchors from the tabindex as they are triggered
    // via the select event. (see below)
    create: function () {
        jQuery("#menu .ui-menu-item a").attr("tabindex", -1);
    },
    // The jQuery menu doesn't seem to like it when the <a> are
    // specified as the "item" and are nested under an <li>. There
    // seems to be styling issues and occassionally an error thrown.
    // The page transition work around below is used to maintian the semantic structure,
    // while allowing the menu to behave as normal.
    select: function (event, ui) {
        var location = ui.item.children("a").attr("href");
        if (location) {
            window.location.href = location;
        }
    }
});

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



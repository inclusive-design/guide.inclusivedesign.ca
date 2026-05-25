const menu = {
	toggleExpansion(element, state) {
		const isExpanded = element.getAttribute('aria-expanded') === 'true';
		state = (state) === undefined ? !isExpanded : state;

		element.setAttribute('aria-expanded', state ? 'true' : 'false');
	},
};

/**
 * Toggle's the aria-expanded state of an element.
 * @param {Node} element - the DOM Node to toggle the aria-expanded state on.
 * @param {boolean} [state] - (optional) explicit state to set aria-expanded to.
 */

/**
 * Initializes a menu widget.
 * @param {string} container - A CSS selector for the menu's container.
 * @param {string} [button] - (optional) A CSS slector for the menu's button. Defaults to "button".
 * @throws {Error} - if no element is found for the container selector.
 * @throws {Error} - if no element is found for the button selector within the container element.
 */
menu.init = (container, button = 'button') => {
	const menuContainer = document.querySelector(container);

	if (!menuContainer) {
		throw new Error(`No element found for container selector: ${container}`);
	}

	const btn = menuContainer.querySelector(button);

	if (!btn) {
		throw new Error(`No element found for button selector: ${button}`);
	}

	// Close the menu when focus is moved away from the menu
	menuContainer.addEventListener('focusout', (event) => {
		if (!menuContainer.contains(event.relatedTarget)) {
			menu.toggleExpansion(btn, false);
		}
	});

	// Close the menu when clicking outside of it.
	// This is needed due to Safari not applying focus to clicked inputs.
	// https://bugs.webkit.org/show_bug.cgi?id=22261
	document.body.addEventListener('click', (event) => {
		if (!menuContainer.contains(event.target)) {
			menu.toggleExpansion(btn, false);
		}
	});

	// Close the menu when the "Escape" key is pressed and the menu has focus. Shifts focus back to the button.
	menuContainer.addEventListener('keyup', (event) => {
		if (event.code === 'Escape') {
			menu.toggleExpansion(btn, false);
			btn.focus();
		}
	});

	// Toggle expansion of menu when button is clicked
	btn.addEventListener('click', () => {
		menu.toggleExpansion(btn);
	});
};

// Initialize the language picker
menu.init('.idg-language-picker');

// Initialize the mobile navigation menu
menu.init('.idg-menu-nav');

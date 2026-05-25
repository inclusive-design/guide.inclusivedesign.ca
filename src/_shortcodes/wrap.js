import MarkdownIt from 'markdown-it';

/**
 * @param {string} content - The content string to wrap and render into HTML.
 * @param {string} classNames - Optional class names to add to the wrapping element.
 * @param {string} tag - The tag name within which to wrap the rendered HTML content.
 * @returns {string} - Rendered HTML.
 */
const wrap = (content, classNames = '', tag = 'div') => {
	const md = new MarkdownIt({
		html: true,
		breaks: true,
		linkify: true,
	});
	return `<${tag} class="${classNames}">${md.render(content).trim()}</${tag}>`;
};

export default wrap;

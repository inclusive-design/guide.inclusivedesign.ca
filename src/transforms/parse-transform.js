const jsdom = require('jsdom');
const MarkdownIt = require("markdown-it");
const { JSDOM } = jsdom;

module.exports = (value, outputPath) => {
	if (outputPath && outputPath.includes('.html')) {
		const DOM = new JSDOM(value, {
			resources: 'usable'
		});

        const document = DOM.window.document;
        
        const md = new MarkdownIt({
            html: true,
            breaks: true,
            linkify: true
        });

        const figures = [
			...document.querySelectorAll('article figure')
        ];

        const captions = [
			...document.querySelectorAll('article figcaption')
        ];

        const sections = [
			...document.querySelectorAll('article idg-highlight-section')
        ];

        const h2Elements = [
            ...document.querySelectorAll('article h2')
        ];

        if (h2Elements.length > 0) {
            h2Elements.forEach(h2 => {
                if (!h2.nextElementSibling.tagName === 'UL') return;

                if (['Try', 'Use'].includes(h2.textContent)) {
                    h2.nextElementSibling.classList.add('idg-articleContentUse');
                } else if (['Combine With', 'How', 'Why'].includes(h2.textContent)) {
                    h2.nextElementSibling.classList.add('idg-articleContentUseWhyHow');
                }
            });
        }

        if (captions.length > 0) {
            captions.forEach(caption => {
                caption.innerHTML = md.render(caption.innerHTML);
            });
        }

        if (figures.length > 0) {
            figures.forEach(figure => {
                figure.innerHTML = md.render(figure.innerHTML);
            });
        }

        if (sections.length > 0) {
            sections.forEach(sections => {
                sections.innerHTML = md.render(sections.innerHTML);
            });
        }

		return '<!DOCTYPE html>\r\n' + document.documentElement.outerHTML;
	}

	return value;
};

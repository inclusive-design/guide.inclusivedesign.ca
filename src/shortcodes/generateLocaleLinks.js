"use strict";

const config = require("../_data/config.json");

module.exports = (lang, page, category, collection) => {
    let output = "";
    for (let language in config.languages) {
        if (lang && lang !== language) {
            let langProps = config.languages[language];
            if (category && collection) {
                let matchedPage = collection[`${category}_${language}`].find(item => item.fileSlug === page.fileSlug);
                if (matchedPage) {
                    output += `<a href="${matchedPage.url}">${langProps.name}</a>`;
                }
            } else {
                output += `<a href="/${language === config.defaultLanguage ? "" : langProps.slug}">${langProps.name}</a>`;
            }
        }
    }

    return output ? `<nav class="idg-locale" aria-label="locale">${output}</nav>` : output;
};

"use strict";

const config = require("../_data/config.json");

module.exports = (locale, translationKey, category, collection) => {
    let output = "";

    if (locale) {
        for (let language in config.languages) {
            let langProps = config.languages[language];
            let attrs = locale === language ? "aria-current=\"page\"" : "";
            let url = language === config.defaultLanguage ? "/" : `/${langProps.slug}`;

            if (category && collection && translationKey) {
                let matchedPage = collection[`${category}_${language}`].find(page => page.fileSlug === translationKey);
                if (matchedPage) {
                    url = matchedPage.url;
                }
            }

            output += `<li><a href="${url}" ${attrs}>${langProps.name}</a></li>`;
        }
    }

    return output;
};

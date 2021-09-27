"use strict";

const getLang = require("../../utils/getLang.js");
const generatePermalink = require("../../utils/generatePermalink.js");

module.exports = {
    layout: "layouts/index.njk",
    eleventyComputed: {
        /* Determine the language of this item based on the language code in the file path. */
        lang: data => getLang(data.page.filePathStem, "pages"),
        /* Set the translationKey, used for populating the language switcher, to the file slug. */
        translationKey: data => {
            const lang = getLang(data.page.filePathStem, "pages");

            if (data.page.fileSlug === lang) {
                return "index";
            }

            return data.page.fileSlug;
        },
        /* Build a permalink using the title and language key, or to the 404 page. */
        permalink: data => {
            if (data.page.fileSlug !== "404") {
                return generatePermalink(data, "pages");
            }

            let lang = getLang(data.page.filePathStem, "pages");

            if (lang !== data.config.defaultLanguage) {
                return `/${data.config.languages[lang].slug}/404.html`;
            }
            return "/404.html";

        }
    }
};

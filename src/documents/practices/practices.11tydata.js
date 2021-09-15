"use strict";

const getLang = require("../../utils/getLang.js");
const generatePermalink = require("../../utils/generatePermalink.js");

let collection = "practices";

module.exports = {
    category: "Practices",
    layout: "layouts/category.njk",
    eleventyComputed: {
        /* Determine the language of this item based on the language code in the file path. */
        lang: data => getLang(data.page.filePathStem, collection),
        /* Set the translationKey, used for populating the language switcher, to the file slug. */
        translationKey: data => data.page.fileSlug,
        /* Build a permalink using the title, language key, and translated collection type slug. */
        permalink: data => generatePermalink(data, collection),
        eleventyNavigation: data => {
            /* To have the navigation localized, use the page's title as the navigation title. */
            if (data.eleventyNavigation) {
                return {
                    title: data.title,
                    lang: data.lang,
                    ...data.eleventyNavigation
                };
            }
            return false;
        }
    }
};

"use strict";

const generatePermalink = require("../../utils/generatePermalink.js");

module.exports = {
    category: "Insights",
    layout: "layouts/category.njk",
    eleventyComputed: {
        /* Set the translationKey, used for populating the language switcher, to the file slug. */
        translationKey: data => data.page.fileSlug,
        /* Build a permalink using the title, language key, and translated collection type slug. */
        permalink: generatePermalink,
        eleventyNavigation: data => {
            /* To have the navigation localized, use the page's title as the navigation title. */
            if (data.eleventyNavigation) {
                return {
                    title: data.title,
                    locale: data.locale,
                    ...data.eleventyNavigation
                };
            }
            return false;
        }
    }
};

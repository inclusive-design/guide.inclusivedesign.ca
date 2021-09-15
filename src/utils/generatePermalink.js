"use strict";

const config = require("../_data/config.json");
const getLang = require("./getLang.js");
const slugFilter = require("../../node_modules/eleventy-plugin-fluid/src/filters/slug-filter.js");
const translations = require("../_data/translations.json");

module.exports = (data, collectionType) => {
    /* If this page is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
    if (!Object.prototype.hasOwnProperty.call(data, "title")) {
        return false;
    }

    const lang = getLang(data.page.filePathStem, collectionType);
    const langSlug = config.languages[lang].slug || lang;
    const slug = slugFilter(data.title);
    const collectionSlug = slugFilter(translations[lang][collectionType] || "");

    if (collectionType === "pages" || slug === collectionSlug) {
        if (data.page.fileSlug === lang) {
            return (lang === config.defaultLanguage) ? "/" : `/${langSlug}/`;
        }

        return (lang === config.defaultLanguage) ? `/${slug}/` : `/${langSlug}/${slug}/`;
    } else {
        return (lang === config.defaultLanguage) ? `/${collectionSlug}/${slug}/` : `/${langSlug}/${collectionSlug}/${slug}/`;
    }
};

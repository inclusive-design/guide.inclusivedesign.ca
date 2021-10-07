"use strict";

const config = require("../_data/config.json");
const slugFilter = require("../../node_modules/eleventy-plugin-fluid/src/filters/slug-filter.js");
const i18n = require("eleventy-plugin-i18n-gettext");

module.exports = (data) => {
    /* If this page is a "stub" with no localized title, we assume it does not exist and prevent it from building. */
    if (!Object.prototype.hasOwnProperty.call(data, "title")) {
        return false;
    }

    const locale = data.locale;
    const localeSlug = config.languages[locale].slug || locale;
    const slug = slugFilter(data.title);
    const collection = data.category && data.category.toLowerCase() || "";
    const collectionSlug = slugFilter(i18n._(locale, collection) || "");
    const root = (locale === config.defaultLanguage) ? "/" : `/${localeSlug}/`;

    if (!collection && locale === data.page.fileSlug) {
        return root;
    }

    if (data.eleventyNavigation && data.eleventyNavigation.key === data.category) {
        return `${root}/${collectionSlug}/`;
    }

    return `${root}/${collectionSlug}/${slug}/`;
};

"use strict";

const i18n = require("eleventy-plugin-i18n-gettext");

module.exports = () => {
    // NOTE: Due to [issue #22](https://github.com/sgissinger/eleventy-plugin-i18n-gettext/issues/22) when passing in
    // the locale, it needs to use a variable called `locale`.
    let locale = "en-CA";

    // NOTE: Due to [issue #23](https://github.com/sgissinger/eleventy-plugin-i18n-gettext/issues/23) when passing in
    // the `key`, if it isn't plain text it will not be included in messages.js. The following is not returned to the
    // site data, but it is used to force translations for the category types.
    /* eslint-disable-next-line no-unused-vars */
    let categories = {
        "activities": i18n._(locale, "activities"),
        "insights": i18n._(locale, "insights"),
        "practices": i18n._(locale, "practices"),
        "tools": i18n._(locale, "tools")
    };

    return {
        "title": i18n._(locale, "The Inclusive Design Guide"),
        "license": i18n._(locale, "Creative Commons CC BY 3.0"),
        "licenseURL": i18n._(locale, "https://creativecommons.org/licenses/by/3.0/"),
        "org": i18n._(locale, "Inclusive Design Research Centre"),
        "orgURL": i18n._(locale, "https://idrc.ocad.ca/"),
        "institute": i18n._(locale, "OCAD University"),
        "instituteURL": i18n._(locale, "https://www.ocadu.ca/")
    };
};

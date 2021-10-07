"use strict";

const i18n = require("eleventy-plugin-i18n-gettext");
const config = require("../../../_data/config.json");
const path = require("path");

module.exports = () => {
    let locale = path.basename(__dirname);
    return i18n.enhance11tydata({}, locale, config.languages[locale].dir);
};

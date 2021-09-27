"use strict";

const config = require("../_data/config.json");
const translations = require("../_data/translations.json");

const get = (obj, path) => {
    path = typeof(path) === "string" ? path.split(".") : path;

    if (!obj) {
        return;
    }

    if (!path || !path[0]) {
        return obj;
    } else {
        return get(obj[path[0]], path.slice(1));
    }
};

module.exports = (path, lang) => {
    return get(translations[lang], path) || get(translations[config.defaultLanguage], path) || "";
};

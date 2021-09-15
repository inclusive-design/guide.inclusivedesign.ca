"use strict";

module.exports = (filePathStem, collection) => {
    return [...filePathStem.matchAll(new RegExp(`\/documents\/${collection}\/([A-Za-z-]*)\/[a-z0-9-]*`, "g"))][0][1];
};

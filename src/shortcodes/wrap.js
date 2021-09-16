"use strict";

const MarkdownIt = require("markdown-it");

module.exports = (content, classNames = "", tag = "div") => {
    const md = new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true
    });
    return `<${tag} class="${classNames}">${md.render(content).trim()}</${tag}>`;
};

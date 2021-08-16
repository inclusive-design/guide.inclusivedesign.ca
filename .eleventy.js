"use strict";

const fs = require("fs");
const fluidPlugin = require("@fluid-project/eleventy-plugin-fluid");
const navigationPlugin = require("@11ty/eleventy-navigation");
const parseTransform = require("./src/transforms/parse-transform.js");

module.exports = function (config) {
    config.setUseGitIgnore(false);

    // Layouts
    config.addLayoutAlias("default", "layouts/default.njk");

    // Plugins
    config.addPlugin(fluidPlugin);
    config.addPlugin(navigationPlugin);

    // Shortcodes
    config.addPairedShortcode("figure", function (content, img, alt) {
        return `<figure>\n<a href="${img}"><img src="${img}" alt="${alt}" /></a><figcaption>${content}</figcaption>\n</figure>`;
    });

    // Transforms
    config.addTransform("parse", parseTransform);

    // Passthrough copy
    config.addPassthroughCopy({"src/_redirects": "_redirects"});
    config.addPassthroughCopy({"src/assets/images": "assets/images"});
    config.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
    config.addPassthroughCopy({"src/assets/print": "assets/print"});
    config.addPassthroughCopy({"src/assets/print-branding": "assets/print-branding"});
    config.addPassthroughCopy({"node_modules/docs-core/src/static/css": "assets/styles"});
    config.addPassthroughCopy({"node_modules/docs-core/src/static/lib": "lib"});

    // BrowserSync
    config.setBrowserSyncConfig({
        callbacks: {
            ready: (error, browserSync) => {
                const content404 = fs.readFileSync("dist/404.html");

                browserSync.addMiddleware("*", (request, response) => {
                    // Provides the 404 content without redirect.
                    response.write(content404);
                    response.writeHead(404);
                    response.end();
                });
            }
        }
    });

    return {
        dir: {
		  input: "src",
		  output: "dist"
        },
        passthroughFileCopy: true,
        markdownTemplateEngine: "njk"
 	};
};

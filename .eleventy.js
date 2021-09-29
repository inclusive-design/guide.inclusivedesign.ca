"use strict";

const fs = require("fs");
const fluidPlugin = require("eleventy-plugin-fluid");
const navigationPlugin = require("@11ty/eleventy-navigation");
const wrap = require("./src/shortcodes/wrap.js");
const generateLocaleLinks = require("./src/shortcodes/generateLocaleLinks.js");
const translate = require("./src/shortcodes/translate.js");

// Import data files
const siteConfig = require("./src/_data/config.json");

module.exports = function (config) {
    config.setUseGitIgnore(false);

    // Plugins
    config.addPlugin(fluidPlugin);
    config.addPlugin(navigationPlugin);

    // Shortcodes
    config.addPairedShortcode("unmarkedList", (content) => wrap(content, "list-articles"));
    config.addShortcode("icon", function (collection) {
        return `<svg class="icon-${collection}"><use xlink:href="/assets/images/icons.svg#icon-${collection}"></use></svg>`;
    });
    config.addShortcode("localeLink", generateLocaleLinks);
    config.addShortcode("translate", translate);

    // Passthrough copy
    config.addPassthroughCopy({"src/_redirects": "_redirects"});
    config.addPassthroughCopy({"src/assets/images": "assets/images"});
    config.addPassthroughCopy({"src/assets/fonts": "assets/fonts"});
    config.addPassthroughCopy({"node_modules/docs-core/src/static/css": "assets/styles"});
    config.addPassthroughCopy({"node_modules/jquery-ui/themes": "lib/jquery-ui/themes"});
    config.addPassthroughCopy({"node_modules/jquery-ui/ui": "lib/jquery-ui/ui"});

    // Custom collections
    Object.keys(siteConfig.languages).forEach(lang => {
        config.addCollection(`Activities_${lang}`, collection => {
            return collection.getFilteredByGlob(`./src/documents/activities/${lang}/*.md`);
        });
        config.addCollection(`Insights_${lang}`, collection => {
            return collection.getFilteredByGlob(`./src/documents/insights/${lang}/*.md`);
        });
        config.addCollection(`Practices_${lang}`, collection => {
            return collection.getFilteredByGlob(`./src/documents/practices/${lang}/*.md`);
        });
        config.addCollection(`Tools_${lang}`, collection => {
            return collection.getFilteredByGlob(`./src/documents/tools/${lang}/*.md`);
        });
    });

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

    config.on("beforeBuild", () => {
        if (!siteConfig.languages[siteConfig.defaultLanguage]) {
            process.exitCode = 1;
            throw new Error(`The default language, ${siteConfig.defaultLanguage}, configured in src/_data/config.json is not one of your site's supported languages.`);
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

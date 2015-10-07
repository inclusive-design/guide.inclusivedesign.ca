/*
Copyright 2014 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// This project's repository on GitHub. Used to build URLs for "Edit on GitHub" links
// Change this value to match your site.
var githubDocRoot = "https://github.com/fluid-project/docs-template/blob/master/src/documents/";

var path = require("path");
var fs = require("fs");
var docsCore = require("docs-core");
var siteStructure = JSON.parse(fs.readFileSync("site-structure.json"));

// We locate the images within the src/documents directory so that images can
// be viewed on GitHub, as well as in the DocPad output. We need to
// instruct DocPad to treat the images specially so that they are not
// processed. We tell DocPad to ignore the images using "ignorePaths" and we
// then copy them ourselves with a "writeAfter" event handler.
var rootPath = process.cwd();
var imagesSrcDir = path.join(rootPath, "src", "documents", "images");
var imagesDestDir = "out/images";

module.exports = {
    rootPath: rootPath,
    filesPaths: [
        docsCore.getStaticFilesDir(),
        "static"
    ],
    ignorePaths: [ imagesSrcDir ],
    renderSingleExtensions: true,
    templateData: {
        siteStructure: siteStructure
    },
    plugins: {
        handlebars: {
            helpers: {
                rewriteMdLinks: docsCore.helpers.rewriteMdLinks,
                getGithubLocation: docsCore.helpers.makeGithubLocationHelper(githubDocRoot),
                getRelativeUrl: docsCore.helpers.getRelativeUrl,
                ifEqual: docsCore.helpers.ifEqual
            }
        },
        highlightjs: {
            aliases: {
                stylus: "css"
            }
        },
        stylus: {
            stylusLibraries: {
                nib: true
            },
            stylusOptions: {
                compress: true,
                'include css': true
            }
        },
        uglify: {
            //  Disable UglifyJS on the development environment.
            environments: {
                development: {
                    enabled: false
                }
            },

            //  Pass false to skip compressing entirely. Pass an object to specify custom
            //  compressor options: http://lisperator.net/uglifyjs/compress .
            compress: {},

            //  Pass false to skip mangling names.
            mangle: {}
        }
    },

    environments: {
        development: {
            stylusOptions: {
                // Disable compression on the development environment
                compress: false
            }
        }
    }
};

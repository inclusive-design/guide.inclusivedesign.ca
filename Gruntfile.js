/*
Copyright the Inclusive Design Guide copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/inclusive-design/guide.inclusivedesign.ca/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/inclusive-design/guide.inclusivedesign.ca/raw/main/LICENSE.md.
*/

/* eslint-env node */
"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Project package file destination.
        pkg: grunt.file.readJSON("package.json"),
        lintAll: {
            sources: {
                json: ["./*.json", ".eslintrc.json", ".stylelintrc.json", "./src/**/*.json"],
                js: ["./*.js", ".eleventy.js", "src/**/*.js", "!src/lib/**/*.js"],
                md: ["./src/documents/**/*.md","README.md","CONTRIBUTING.md","AUTHORS.md","./src/*.md", "!dist/**/*.md"]
            }
        }
    });
    // Load the plugin(s):
    grunt.loadNpmTasks("fluid-grunt-lint-all");
    // Custom tasks:
    grunt.registerTask("default", ["lint"]);
    grunt.registerTask("lint", "Perform all standard lint checks.", ["lint-all"]);
};

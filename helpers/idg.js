/*
Copyright 2016 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

var fs = require("fs");

module.exports.helpers = {};

module.exports.helpers.getCategoryIcon = function (category) {
    switch (category.toLowerCase()) {
        case ("principles"):
            return (fs.readFileSync("src/static/images/icon-circle.svg", 'utf8'));
        case ("practices"):
            return (fs.readFileSync("src/static/images/icon-diamond.svg", 'utf8'));
        case ("tools"):
            return (fs.readFileSync("src/static/images/icon-square.svg", 'utf8'));
        case ("activities"):
            return (fs.readFileSync("src/static/images/icon-hexagon.svg", 'utf8'));
        case ("dimensions"):
            return (fs.readFileSync("src/static/images/icon-dimension.svg", 'utf8'));
        default:
            return;
    }
}

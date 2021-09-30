"use strict";

const _paq = window._paq = window._paq || [];
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
    const siteId = "23"; // Set this to the ID of your site in Matomo. Value must be quoted.
    const u = "https://analytics.inclusivedesign.ca/";
    _paq.push(["setTrackerUrl", u + "matomo.php"]);
    _paq.push(["setSiteId", siteId]);
    const d = document;
    const g = d.createElement("script");
    const s = d.getElementsByTagName("script")[0];
    g.async = true;
    g.src = u + "matomo.js";
    s.parentNode.insertBefore(g, s);
})();

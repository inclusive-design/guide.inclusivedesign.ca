# Contributing

## Licensing

Code contributions ard licensed under the [3-Clause BSD](https://opensource.org/licenses/BSD-3-Clause) license.

Content contributions are licensed under the
[Creative Commons CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) license.

## Process/Workflow

The general contribution workflow is for contributors to fork the project repository, work in a branch created off of
`main`, and submit a pull request against the project repo's `main` branch to merge their contributions.

For submitting localizations, one could also create a new
[issue](https://github.com/inclusive-design/guide.inclusivedesign.ca/issues) with the new localizations. When another
contributor is available, they could work with the original contributor to sheppard the localization into the project.

### Commit Logs

Commit logs follow the [Conventional Commits V1.0.0](https://www.conventionalcommits.org/en/v1.0.0/) specification. This
allows for easier parsing of the type of changes to expect within a commit.

### Linting

Files are linted, statically analyzed for style and syntax conventions. Please ensure that you run the lint task before
submitting a PR.

```bash
npm run lint
```

For more information about configuration and rules see:

* [fluid-lint-all](https://www.npmjs.com/package/fluid-lint-all)
* [eslint-config-fluid](https://www.npmjs.com/package/eslint-config-fluid)
* [stylelint-config-fluid](https://www.npmjs.com/package/stylelint-config-fluid)

## Localization/Internationalization

### Adding new locales

Steps for adding additional locales.

1. Add [configuration](#locale-configuration) for the locale under the `languages` property in `src/_data/config.json`.
2. For each directory under `src/documents` duplicate the `en-CA` directory and rename based on the new locale
   1. In the new directory rename the 11tydata file after the new directory name.
   2. [Localize](#localizing-the-content) all of the Markdown files' `title` front matter and content.
3. In `src/locales` duplicate the `fr` directory and rename based on the new locale
   1. [Update the `messages.po` and `messages.mo`](#localizing-other-text) files in the new directory for the new
      locale.
      1. Update the `Language`
      2. Update the localized text

### Locale Configuration

The [`src/_data/config.json`](./src/_data/config.json) file contains configuraiton for each supported locale under the
`languages` property. Each locale is keyed with the language identifier using the
[BCP-47](https://tools.ietf.org/search/bcp47) format of language-locale e.g `"en-CA"` for Canadian English. The locale
must specify the following:

* **slug**: used in the URL to display the localized resource. This must be unique and match the locale being
  configured. It could be in the form of just language (e.g. `"en"`) or language-locale (e.g. `"en-CA"` or `"en-ca"`).
  For the default language, the locale slug will not be added to the URL.
* **uioSlug**: passed to UI Options widget to specify its locale to use. UI Options uses the form language (e.g `"en"`)
  or language_locale (e.g. `"en_CA"`). UI Options provides its own
  [localization](https://github.com/fluid-project/infusion/tree/main/src/framework/preferences/messages) outside of the
  context of this site and will fall back to English if it does not support a requested localization.
* **dir**: The direction of the language, either `"ltr"` (left-to-right) or `"rtl"` (right-to-left). It will default to
  `"ltr"` if not specified.
* **name**: The human readable name of the language, in the locale's language. It is used to identify which languages
  are availalbe to switch between.

For example if we wanted to add a Spain, Spanish locale we could add the following to the `languages` block in
`src/_data/config.json`:

```JSON
{
    "en-ES": {
        "slug": "es",
        "uioSlug": "es",
        "dir": "ltr",
        "name": "Español"
    }
}
```

### Localizing the content

The main content of the site is all contained within the [`src/documents`](./src/documents) directory. These are
separated into collections/directories for the various categories (activities, insights, pages, practices) and pages
(index, 404).

Each collection is split into sub-directories cooresponding to the locales. Each locale dirctory will contain the
Markdown files for each page in the collection. These should be the same across all locale directories within a
collection; with the content of the files being localized as needed.

For example if we're adding a new page to the Activities called "My Activity" we'd add a "MyActivity.md" file to each
locale. e.g. `src/documents/activities/en-CA/MyActivity.md` and `src/documents/activities/fr/MyActivity.md`. They both
retain the same file name, which allows for switching between the localized version with the language switcher on the
site.

The English (`en-CA`) version might look like.

```Markdown
---
title: My Activity
eleventyNavigation:
    parent: Activities
    key: My Activity
---

Content for My Activity.

```

The French (`fr`) version might look like.

```Markdown
---
title: Mon activité
eleventyNavigation:
    parent: Activities
    key: My Activity
---

Contenu pour Mon Activité.
```

It's important to note that only two parts are localized; the main content portion of the Markdown file, and the `title`
in the YAML front matter. Othe portions of the front matter is likely not localized as it is often used for
configuration as opposed to content. In the above example, the `eleventyNavigation` configures the category page
navigation.

Additionly each, locale directory will contain an
[11ty data file](https://www.11ty.dev/docs/data-template-dir/) which is named after the locale directly. For example:
`src/activities/en-CA` contains the `en-CA.11tydata.js` file. The 11ty data files contain configuration for setting up
the [eleventy-plugin-i18n-gettext](https://www.npmjs.com/package/eleventy-plugin-i18n-gettext) used on the page for
other localizations. It populates the `locale`, `lang` and `langDir` properties and the localization related
functions/shortcodes/filters available in the templates. (See:
[i18n.enhance11tydata(obj, locale, dir?)](https://www.npmjs.com/package/eleventy-plugin-i18n-gettext#i18nenhance11tydataobj-locale-dir)
) Other than the name of the file, the contents are all identical, and can be copied and renamed when adding additional
locales or collections. These files need to be added for each locale directory as the `locale` value set by them is
sourced from the locale directory name.

#### Localizing other text

While the majority of the text is the content stored in the Markdown files, ther are plenty of other locations where
text may appear. In particular, the header, footer, aria-labels, routing, and etc. These portions of the site tend to
be templated in the [layout](./src/_includes/layouts) and [partials](./src/_includes/partials), or added via
[utiliy](.src/utils) functions. In these cases we make use of the [gettext](https://www.gnu.org/software/gettext/) style
localization features provided by
[eleventy-plugin-i18n-gettext](https://www.npmjs.com/package/eleventy-plugin-i18n-gettext).

In the Nunjucks templates we tend to use the `{{ _() }}` and `{{ _i() }}` function calls. The first just takes a `key`;
which is the text to be translated. The second allows for interpolation of values into the translated string.

For example:

```Nunjucks
<h1>{{ _("Example") }}</h1>

<p>{{ _i("Using ${templateName} template engine.", {templateName: "Nunjucks"}) }}</p>
```

Would render the follwing in English:

```HTML
<h1>Example</h1>

<p>Using Nunjucks template engine</p>
```

A French localization might render like:

```HTML
<h1>Exemple</h1>

<p>Utiliser le moteur de template Nunjucks</p>
```

In JavaScript we need to import the [eleventy-plugin-i18n-gettext](https://www.npmjs.com/package/eleventy-plugin-i18n-gettext)
into our code and make calls to the functions.

```JavaScript
"use strict";

const i18n = require("eleventy-plugin-i18n-gettext");

module.exports = (data) => {
    const locale = "en-CA";
    return i18n._(locale, "To translate");
};
```

_**NOTE**: Due to [issue #22](https://github.com/sgissinger/eleventy-plugin-i18n-gettext/issues/22) when passing in the
locale, it needs to use a variable called `locale`_

_**NOTE**: Due to [issue #23](https://github.com/sgissinger/eleventy-plugin-i18n-gettext/issues/23) when passing in the
`key`, if it isn't plain text it will not be included in messages.js. A workaround, if a variable is being used, is to
make a call with the resolved text elsewhere. For examplethe category names, used in URLs, are explicitly called in
`src/_data/site.js`. This applies to calls made in JavaScript and templates._

The specific localizations are provided in the .po and/or .mo files locataed in the [locales](./src/locales) directory.
The strings to translate are automatically picked up when a build is generated (`npm start`) and added to
[messages.js](./src/locales/messages.js). This allows for tools like [Poedit](https://poedit.net) to easily find the
strings that need to be translated. You could also update the .po and generate the .mo files manually.

#### Using Poedit

You'll need to add a JavaScript extractor when first setting up Poedit. See
[Poedit configuration for translations extraction](https://github.com/sgissinger/eleventy-plugin-i18n-gettext/blob/HEAD/docs/Manage-translations-with-Poedit.md)
for information about setup.

To update the .po and .mo files perform the following steps:

1. Launch Poedit
2. Browse for the .po file you'd like to edit
3. Open the .po file
4. `Translations > Update from Source Code`
   * This will update the .po file with all of the current translations
   * If this step doesn't pick up the localizations from messages.js, ensure that the source paths are set corrctly.
     * `Translations > Properties... > Source Paths
5. Select the "Source Text" to localize, add the necessary "Translation"
6. To remove old strings go to: `Translations > Purge Deleted Translations`
7. Save
8. Make sure to commit the updates .po and .mo files to the repo.

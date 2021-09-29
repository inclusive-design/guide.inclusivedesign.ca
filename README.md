# Inclusive Learning Design Handbook

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d5c6794-ebd2-4908-8918-3207a3f54251/deploy-status)](https://app.netlify.com/sites/idrc-inclusive-design-guide/deploys)

This project contains the content needed to build and deploy a copy of the Inclusive Design Guide.

## Usage

### To run locally in development mode

1. Install the required NPM packages: `npm install`
2. Run [Eleventy](http://11ty.dev) in development mode: `npm start`.

The website will be available at <http://localhost:8080>.

### To build and serve using Docker

You can build and serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t guide .`
* Run the container: `docker run --name guide -p 8000:80 guide`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

### To build for deployment to a personal web server

1. Install the required NPM packages: `npm install`
2. Run the build script: `npm run build`
3. Upload the contents of the `./dist/` directory to the web root of your server.

If you make changes to the website, repeat step 2 to build the website and upload any changed files from the `./dist/`
directory to the web root of your server.

### Localization/Internationalization

#### Default langauge

The default language is specified in `src/_data/config.json` under the `defaultLanguage` property. This must
coorespond to a configured language locale and will instruct the site to generate the site with this as the
default localization.

The default localization locale will not be added to the URL; however, all other localizations will include the
locale in the URL.

#### Localizing content

The site content is contained in Markdown (.md) files located in the `documents` directory. The `documents` directory is
organized into sub-directories for each category of documents and a generic `pages` directory. All of these are further
dividid into sub-directories for each locale.

The locale directories in a category and the pages directory should be contain the same Markdown files. However, their
contents and front matter `title` will be localized in their respective locale. Additionally each will contain an
[11ty data file](https://www.11ty.dev/docs/data-template-dir/) that provides localization data for rendering the page.

#### Localizing other text

To provide specific localizations for text in layouts, partials, and other areas,
[eleventy-plugin-i18n-gettext](https://www.npmjs.com/package/eleventy-plugin-i18n-gettext) is used to provide a
[gettext](https://www.gnu.org/software/gettext/) based approached.

Calls can either be made in JavaScript or in template files using function, shortcodes, or filters. See the plugin's
[API Usage](https://www.npmjs.com/package/eleventy-plugin-i18n-gettext#api-usage) for more details.

_**NOTE**: Due to [issue #22](https://github.com/sgissinger/eleventy-plugin-i18n-gettext/issues/22) when passing in the
locale, it needs to use a variable called `locale`_

_**NOTE**: Due to [issue #23](https://github.com/sgissinger/eleventy-plugin-i18n-gettext/issues/23) when passing in the
`key`, if it isn't plain text it will not be included in messages.js. A workaround, if a variable is being used, is to
make a call with the resolved text elsewhere. For examplethe category names, used in URLs, are explicitly called in
`src/_data/site.js`_

When generating a build, gettext style calls are automatically found and added to `src/locales/messages.js` which can
be used to update .po files. The simplest way is to use an PO editor such as [poedit](https://poedit.net). See:
[Poedit configuration for translations extraction](https://github.com/sgissinger/eleventy-plugin-i18n-gettext/blob/HEAD/docs/Manage-translations-with-Poedit.md)

#### Adding new locales

Steps for adding additional locales.

1. Add configuration for the locale under the `languages` property in `src/_data/config.json`.
2. For each directory under `src/documents` duplicate the `en-CA` directory and rename based on the new locale
   1. In the new directory rename the 11tydata file after the new directory name.
   2. Localize all of the Markdown files' `title` front matter and content.
3. In `src/locales` duplicate the `fr` directory and rename based on the new locale
   1. Update the `messages.po` and `messages.mo` files in the new directory for the new locale.
      1. Update the `Language`
      2. Update the localized text

## License Information

The Inclusive Design Guide's code is licensed under the [BSD
3-Clause](https://github.com/inclusive-design/guide.inclusivedesign.ca/blob/main/LICENSE.md) license.

The Inclusive Design Guide's content is licensed under the [Creative Commons Attribution
3.0](http://creativecommons.org/licenses/by/3.0/) license.

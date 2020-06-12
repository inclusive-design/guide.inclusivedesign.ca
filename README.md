# About the Inclusive Design Guide

This project contains the content related to the Inclusive Design Guides.

The HTML content is generated with `docpad` and uses the [`docs-template`](https://github.com/fluid-project/docs-template) project as its template.

# Building

1. Get a local copy of the [`Inclusive Design Guides repository`](https://github.com/inclusive-design/guides.inclusivedesign.ca).

2. Install DocPad if it isn't already installed:
```
sudo npm install -g docpad
```
3. Get the required node modules:
```
npm install
```
4. Run docpad:
```
docpad run
```
5. Confirm everything is set up properly by opening `http://localhost:9778/` in a web browser.

# Building Docker image

You can serve the website from a [Docker](https://docs.docker.com/get-docker) container.

Once you have Docker installed, run the following commands to build a Docker image and start a container:

* Build the image: `docker build -t guide .`
* Run the container: `docker run --name guide -p 8000:80 guide`

The website will be available at [http://localhost:8000](http://localhost:8000)

If you make changes to the website, repeat the steps to build the image and start a new container.

# Modifying Content

If you wish to edit or modify the design guides content, you will find the content located in the `./src/documents/` directory. Each category is located in its own sub-directory.

# Adding New Content

If you wish to add new content, copy the text from an existing content file and paste it into a new blank text file. Then customize the title, text, and category to match your new content.

Here are some important remarks:

* The new filename should be "heads-up camel case" (each word in the filename is to be capitalized, with no no spaces or punctuation).
* The file should be saved in the directory matching the name of the "category" text field in your content.
* The `site-structure.json` file should be updated with the new file, otherwise it will not appear in the navigation.

# Deploy to GitHub Pages
```
docpad deploy-ghpages --env static
```

*Note:* The above command will deploy to the origin of the repository. To deploy
to production, you may need to be working from Master, not a fork.

# Generating a Static version
To create a static version of the site, run: `docpad generate --env static`. This will generate a version in the `./out/` directory which you can then view locally or upload to a web server.

# Differences with docs-template
The Inclusive Design Guide uses the `docs-template` project, but uses a slightly different template structure. The `docs-template` uses a single content template `default.html.handlebars`. The Inclusive Design Guide instead refactored that default template into partials located in the `/layouts/partials/` directory.

# License Information
The docs-template project is licensed under Creative Commons Attribution 3.0 - http://creativecommons.org/licenses/by/3.0/

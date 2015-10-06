# About docs-template

This package includes sample content, styles, and navigation which you can customize to create your own documentation site.

`docs-template` is used in conjunction with:
* [`docs-core`](https://github.com/fluid-project/docs-core) - supporting libraries like [Fluid Infusion](http://fluidproject.org), [Foundation](http://zurb.foundation.com/), and helper functions.
* [`docpad`](http://docpad.org) - static HTML platform which helps create a functioning website.

The following are instructions on getting your own site running and customized.

# Get Started Making a New / Custom Site

To create a new, custom site based on `docs-template`, you start from an empty repository for your new project.

1. On your local system, start from the directory for the repository for your new site. Example:
```
git init --bare docs-cookbook
cd docs-cookbook
```
2. Add the `docs-template` as a remote. Example:
```
git remote add docs-template https://github.com/fluid-project/docs-template
```
3. Fetch and merge the contents of `docs-template` into your repository. This gives you a skeleton in which you can follow and modify to create a new site.
```
git fetch docs-template
git merge docs-template/master
```
Note: If your repository is initialized with a README.md file, you may have to resolve a conflict.
4. Install DocPad if it isn't already installed:
```
sudo npm install -g docpad
```
5. Get the required node modules:
```
npm install
```
6. Run docpad:
```
docpad run
```
7. Confirm everything is set up properly by opening `http://localhost:9778/` in a web browser.

8. You can now customize the site.

9. Commit your changes to your new site's repository - not docs-template unless you intend to make changes to docs-template.

# Customizing Your Site

To customize your site, the following files are worth examining:

```
.\site-structure.json          Defines the sidebar Topics navigation
                               and the top-bar Category navigation.

.\src\documents\               Content files go in this directory. By default
                               content files can be written with HTML, markdown,
                               and handlebars.

                               Content files contain metadata which defines the
                               category, title, and layout. Category and title
                               map to the site-structure.json file.

.\src\documents\css\           CSS files go in this directory. By default, styles
                               can be written in CSS or Stylus.

                               Customizations can be done by overriding
                               styles defined in the docs-template.css file.
                               You can also use Stylus @import to import the CSS
                               template and then customize as needed.

.\src\gh-pages\                Files specific to github page deployment go in here.
                               Currently this contains the CNAME file.

.\src\layouts\                 Layout templates for content are stored here.
                               default.html.handlebars is used for content.

.\src\static\                  Static files such as fonts, images, PDFs and other
                               content go in here.
```

This structure follows the organization typically found in DocPad projects.
Also see: http://docpad.org/docs/begin

# Getting Updates from docs-template for Your Custom Site

Periodically `docs-template` will have updates. It is suggested you keep up to update with these changes:

```
git fetch docs-template
git merge docs-template/master
npm update
```

Conflicts are expected to occur when merging in changes from `docs-template` to your custom site. Manually resolve each conflict.

# Deploy to GitHub Pages
```
docpad deploy-ghpages --env static
```

*Note:* The above command will deploy to the origin of the repository. To deploy
to production, you may need to be working from Master, not a fork.

# Generating a Static version
To create a static version of the site, run: `docpad generate --env static`. This will generate a version in the `./out/` directory which you can then view locally or upload to a web server.

# Making Changes to docs-template
If you are making changes to the `docs-template`, you will need to update the version number in the `package.json` file to ensure cloned projects will receive their updates.

# License Information
The docs-template project is licensed under Creative Commons Attribution 3.0 - http://creativecommons.org/licenses/by/3.0/

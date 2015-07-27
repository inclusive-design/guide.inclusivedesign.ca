# docs-core Starter Content

This package includes sample content, styles, and navigation which you can
customize to create your own documentation site using Docpad.

# Get Started Making a New / Custom Site

1. On your local system, start from the directory for the repository for your new site.
2. Add the `docs-template` as a remote: `git remote add docs-template https://github.com/fluid-project/docs-template`
3. Fetch and merge the contents of `docs-template` into your repository.
```
git fetch docs-template
git merge docs-template/master
```
4. If your repository is initialized with a README.md file, you may have to resolve a conflict.
5. Install DocPad if it isn't already installed: `sudo npm install -g docpad`
6. Get the required node modules: `npm install` (TODO: package.json looks for `docs-core` URL should point to Fluid's version, not jhung)
7. Run docpad: `docpad run`
8. Confirm everything is working by loading `http://localhost:9778/` in a web browser.
9. You can now customize the site.

# Getting Updates for Your Custom Site

Periodically `docs-template` will have updates. To update:

```
git fetch docs-template
git merge docs-template/master
npm update
```

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

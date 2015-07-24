# docs-core Starter Content

This package includes sample content, styles, and navigation which you can
customize to create your own documentation site using Docpad.

# Get Started Making a New / Custom Site

1. Clone the `docs-core` project: `git clone https://github.com/jhung/docs-core`
2. Clone the `docs-template` project into a custom directory: `git clone https://github.com/jhung/docs-template myProject`  (TODO: update this URL)
3. Change directories into myProject: `cd myProject`
4. Install DocPad if it isn't already installed: `sudo npm install -g docpad`
5. Get the required node modules: `npm install` (TODO: package.json looks for `docs-core` is in a sibling directory to `docs-template`. This should be fixed to use an URL for docs-core instead)
6. Generate the HTML. This will create output in the ./out/ directory: `docpad generate --env static`
7. Open the index.html located in the ./out/ directory in a web browser to confirm everything is working and to see the placeholder site.
8. You can now customize the site.

# Commiting Changes to Your New Site

When you are ready to commit changes, you will first need to change the local git repository's origin to match your own repository. We do this by:

1. renaming initial `origin` to `docs-template`
2. add a new `origin` to reference the new site's repository.

Example:
```
git remote rename origin docs-template
git remote add origin http://www.github.com/~your-project/your-repository/
git remote -v
```

Once this is done, you can commit to the new origin for your site.

# Getting Updates

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

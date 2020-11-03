# Inclusive Learning Design Handbook

[![Netlify Status](https://api.netlify.com/api/v1/badges/7d5c6794-ebd2-4908-8918-3207a3f54251/deploy-status)](https://app.netlify.com/sites/idrc-inclusive-design-guide/deploys)

This project contains the content needed to build and deploy a copy of the Inclusive Design Guide.

## Usage

### To run locally in development mode

1. Install the required NPM packages: `npm install`
2. Run [Eleventy](http://11ty.dev) in development mode: `npm start`.

The website will be available at http://localhost:8080.

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

If you make changes to the website, repeat step 2 to build the website and upload any changed files from the `./dist/` directory to the web root of your server.

## License Information

The Inclusive Design Guide's code is licensed under the [BSD 3-Clause](https://raw.githubusercontent.com/inclusive-design/guide.inclusivedesign.ca/blob/main/LICENSE.md) license.

The Inclusive Design Guide's content is licensed under the [Creative Commons Attribution 3.0](http://creativecommons.org/licenses/by/3.0/) license.

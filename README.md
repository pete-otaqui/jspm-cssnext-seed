# JSPM and CSSNext Seed Project

This project may help you get started with [JSPM](http://jspm.io) and [CSSNext](http://cssnext.io). It provides:

*   JSPM package management - allows you to use AMD, CJS and ES6 code in the same project.
*   Optimized development-time builds (are you bored of rebuilding dependencies like React over and over again?)
*   One built javascript file, containing System JS, your config, your dependencies, and your code.
*   One built css file, processed and optimized with `cssnext`.
*   Sourcemaps for JS and CSS.
*   Management of `<script>` and `<link rel="stylesheet" />` tags in your HTML.
*   Source and packaged code browsing from the same directory*.

\* This is something of a bug-and-a-feature together. You will need to export just the bundled code on actual deployment. This sacrifice makes the development-time experience much better, and is pretty straightforward since you are hopefully only talking about a few changing files.

This seed project is only targeted at POSIX environments (e.g. Linux / OS X), because the author was lazy and used some shell scripting in the npm commands.

## Note about "excluded dependecies"

One of the key parts of this setup relies on you adding rarely-changing dependencies to the list of "excluded" packages in the `npm run bundle-main` command. This uses JSPM pacakge arithmetic, in the form: `jspm bundle js/main - react - lodash`, which bundles your code and ignore (in this case) react and lodash. You then need to make sure that these files **are** included in the `npm run bundle-deps` command, which is like so: `jspm bundle react + lodash`. These commands are in the `package.json` file.

This is not a fantastic strategy for a serious project, but it's not bad for a quick-start, and should be very adaptable to whatever other build tool and configuration setup a team chooses for itself. You could, for example, extract the npm commands out into `gulp` or native node scripts - and use a config file or environment variables to track which files should be treated as "excluded dependencies".

If you forget to add a dependency to this list nothing will break - but your build will be slower than necessary.

## Project Structure

The structure of this project may take a little getting used to, since it keeps both source and packaged files in the same directories.

Packaged files are normally called something along the lines of `bundle-foo.bar` or similar. Here is the complete list:

*   `index.html`
*   `bundle-deps.js`
*   `bundle-deps.js.map`
*   `bundle-main.js`
*   `bundle-main.js.map`
*   `bundle.js`
*   `styles/bundle.css`
*   `styles/bundle.css.map`

You need all those files when developing against packaged code in order for the sourcemaps to function correctly.

The only files you actually need for deployment are:

*   `index.html`
*   `bundle.js`
*   `styles/bundle.css`

You might want to consider stripping the sourcemap references in the js and css files.

The main files to look at to start development are:

*   `js/main.js`
*   `styles/main.css`

## Installation

Checkout the project and run `npm install`, which will in turn trigger `jspm install`.

## Adding Packages

To get any more packages, use jspm:

    jspm install flux

And import / require as you need. Since we're using the magic of jspm and System.js, you can do this in AMD, CJS or ES6 style, like so:

    // ES6
     import flux from 'flux';
    
     // AMD
     require(['flux'], function(flux) { /* ..... */ })
    
     // CJS
     var flux = require('flux');

And don't forget to add those to the "excluded dependencies" in the npm `bundle-main` and `bundle-deps` commands, like so:

    "bundle-main": "jspm bundle js/main - react - lodash - flux bundle-main.js --minify",
     "bundle-deps": "jspm bundle react + lodash + flux bundle-deps.js --minify",

## Usage

This project uses `npm` for build scripts. It allows the user to decide on a more robust build tool if they need one, and such a tool can be adopted organically, gradually replacing parts as needed.

Available commands:

### `npm run bundle-all`

*   Calls `npm run clean`
*   Calls `npm run bundle-deps`
*   Calls `npm run bundle`

### `npm run bundle`

*   Calls `npm run bundle-js`
*   Calls `npm run bundle-html`
*   Calls `npm run bundle-styles`
*   This may be the best command for refreshing the built code.

### `npm run bundle-js`

*   Calls `npm run bundle-main`
*   Calls `npm run bundle-concat`
*   If you're finding `npm run bundle` a bit slow due to the css part, this may speed things up for you.

### `npm run bundle-clean`

*   Deletes `bundle-deps.js`
*   Deletes `bundle-deps.js.map`
*   Deletes `bundle-main.js`
*   Deletes `bundle-main.js.map`
*   Deletes `bundle.js`
*   Deletes `styles/bundle.css`
*   Deletes `styles/bundle.css.map`

### `npm run bundle-deps`

*   jspm bundles "excluded" dependencies into `bundle-deps.js`. If you have big libraries like react, this will probably be a bit slow.

### `npm run bundle-main`

*   jspm bundles `js/main.js`, minus the "excluded" packages, into `bundle-main.js`

### `npm run bundle-concat`

*   Concatenates `jspm_packages/system.js`, `config.js`, `bundle-deps.js` and `bundle-main.js` into `bundle.js`

### `npm run bundle-styles`

*   Runs `styles/main.css` through cssnext, to create `styles/bundle.css`.

### `npm run bundle-html`

*   Applies `useref` to `index-src.html` to create `index.html`, which only references the final bundle files.

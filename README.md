# JSPM and CSSNext Seed Project

This project may help you get started with JSPM and CSSNext. It provides:

*   JSPM package management - allows you to use AMD, CJS and ES6 code in the same project.
*   Optimized development-time builds (are you bored of rebuilding dependencies like React over and over again?)
*   One built javascript file, containing System JS, your config, your dependencies, and your code.
*   One built css file, processed and optimized with `cssnext`.
*   Sourcemaps for JS and CSS.
*   Management of `<script>` and `<link rel="stylesheet" />` tags in your HTML.
*   Source and packaged code browsing from the same directory*.

* This is something of a bug-and-a-feature together. You will need to export just the bundled code on actual deployment. This sacrifice makes the development-time experience much better, and is pretty straightforward since you are hopefully only talking about a few changing files.

This seed project is only targeted at POSIX environments (e.g. Linux / OS X), because the author was lazy and used some shell scripting in the npm commands.

## Note about "excluded dependecies"

One of the key parts of this setup relies on you adding rarely-changing dependencies to the list of "excluded" packages in the `npm run bundle-main` command. This uses JSPM pacakge arithmetic, in the form: `jspm bundle js/main - react - lodash`, which bundles your code and ignore (in this case) react and lodash. You then need to make sure that these files **are** included in the `npm run bundle-deps` command, which is like so: `jspm bundle react + lodash`. These commands are in the `package.json` file.

This is not a fantastic strategy for a serious project, but it's not bad for a quick-start, and should be very adaptable to whatever other build tool and configuration setup a team chooses for itself. You could, for example, extract the npm commands out into `gulp` or native node scripts - and use a config file or environment variables to track which files should be treated as "excluded dependencies".

If you forget to add a dependency to this list nothing will break - but your build will be slower than necessary.

## Installation

Checkout the project and run `npm install`.

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

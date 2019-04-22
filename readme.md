# Magento 2 Frontools

Simple gulp package for scss and js compilation, including browser sync

## Requirements

- Unix-like OS
- Node.js LTS version (currently branch v6). I recommend to use [avn](https://github.com/wbyoung/avn) to automate version switching. Required configuration is already added to repository as `.node-version` file.
- Gulp CLI global package - `yarn global add gulp-cli` or `npm install -g gulp-cli`

## Installation

1. Clone this repository
2. Run `yarn` or `npm install`
3. Setup your index.html in `src` folder
4. Add JS and SCSS files in their directories under `src` folder

## Tasks list

- `clean` - Removes `/dist` directory content.
- `default` - type `gulp` to see this readme in console.
- `dev` - Runs [browserSync](https://www.browsersync.io/), watchers for js, html and scss, as well as `html`, `styles`, `scripts` tasks. Including ESLint and SassLint.
- `styles` - Use this task to manually trigger styles processing, files placed in `src/scss` directory. Including SassLint.
- `scripts-custom` - Runs js files compilation and minification form `src/js/app` directory, including babel. Including ESLint.
- `scripts-vendor` - Runs vendor js files compilation and compilation form `src/js/vendor` directory.
- `scripts` - Combination of `scripts-custom` and `scripts-vendor` tasks.
- `html` - HTML files, from `src` directory, minification.
- `img` - Images, from `src` directory, optimization.

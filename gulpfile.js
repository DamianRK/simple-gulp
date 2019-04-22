var gulp = require("gulp"),
  browserSync = require("browser-sync"),
  sass = require("gulp-sass"),
  sourcemaps = require("gulp-sourcemaps"),
  autoprefixer = require("gulp-autoprefixer"),
  uglify = require("gulp-uglify-es").default,
  babel = require("gulp-babel"),
  concat = require("gulp-concat"),
  imagemin = require("gulp-imagemin"),
  changed = require("gulp-changed"),
  htmlReplace = require("gulp-html-replace"),
  htmlMin = require("gulp-htmlmin"),
  eslint = require("gulp-eslint"),
  del = require("del"),
  postcss = require("gulp-postcss"),
  cssnano = require("cssnano"),
  sassLint = require("gulp-sass-lint"),
  size = require("gulp-size"),
  sequence = require("run-sequence"),
  plumber = require("gulp-plumber"),
  notify = require("gulp-notify"),
  config = {
    dist: "dist/",
    src: "src/",
    cssin: "src/css/**/*.css",
    jsin: "src/js/**/*.js",
    jsInApp: "src/js/app/**/*.js",
    jsInVendor: "src/js/vendor/**/*.js",
    imgin: "src/img/**/*.{jpg,jpeg,png,gif}",
    htmlin: "src/*.html",
    scssin: "src/scss/**/*.scss",
    cssout: "dist/css/",
    jsOut: "dist/js/",
    imgout: "dist/img/",
    htmlout: "dist/",
    cssoutname: "style.css",
    jsOutName: "app.js",
    jsVendorOutName: "script.js",
    cssreplaceout: "css/style.css",
    jsreplaceout: "js/script.js"
  };

gulp.task("reload", () => {
  browserSync.reload();
});

gulp.task("dev", ["html", "styles", "scripts"], () => {
  browserSync({
    server: config.dist
  });
  gulp.watch(config.scssin, ["styles"]);
  gulp.watch(config.jsin, ["scripts"]);
  gulp.watch(config.htmlin, ["html"]);
  gulp.watch([config.htmlin, config.jsin], ["reload"]);
});

gulp.task("styles", () => {
  return gulp
    .src(config.scssin)
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([cssnano()]))
    .pipe(
      autoprefixer({
        browsers: ["last 3 versions"]
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.cssout))
    .pipe(browserSync.stream());
});

gulp.task("scripts-vendor", () => {
  return gulp
    .src(config.jsInVendor)
    .pipe(plumber())
    .pipe(concat(config.jsVendorOutName))
    .pipe(uglify())
    .pipe(gulp.dest(config.jsOut));
});

gulp.task("scripts-app", () => {
  return gulp
    .src(config.jsInApp)
    .pipe(sourcemaps.init())
    .pipe(
      plumber({
        errorHandler: notify.onError("Error: <%= error.message %>")
      })
    )
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(babel())
    .pipe(concat(config.jsOutName))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(config.jsOut))
    .pipe(size({ showFiles: true }))
    .pipe(browserSync.stream());
});

gulp.task("scripts", () => {
  sequence("scripts-vendor", "scripts-app");
});

gulp.task("img", () => {
  return gulp
    .src(config.imgin)
    .pipe(changed(config.imgout))
    .pipe(imagemin())
    .pipe(gulp.dest(config.imgout));
});

gulp.task("html", () => {
  return gulp
    .src(config.htmlin)
    .pipe(
      htmlReplace({
        css: config.cssreplaceout,
        js: config.jsreplaceout
      })
    )
    .pipe(
      htmlMin({
        sortAttributes: true,
        sortClassName: true,
        collapseWhitespace: true
      })
    )
    .pipe(gulp.dest(config.dist));
});

gulp.task("clean", () => {
  return del([config.dist]);
});

gulp.task("build", () => {
  sequence("clean", ["html", "scripts", "styles", "img"]);
});

gulp.task("default", ["dev"]);

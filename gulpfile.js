// Подключение пакетов
const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');


const cssFiles = [
    './src/css/main.css'
];

const jsFiles = [
    './src/js/main.js'
]

// Задачи для gulp

function styles() {
    return gulp.src('src/sass/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('all.css'))
    .pipe(autoprefixer())
    // .pipe(cleanCSS({compatibility: 'ie8', level: 2}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./assets/css'))
    .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('src/**/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify({toplevel: true}))
    .pipe(gulp.dest('./assets/js'))
    .pipe(browserSync.stream());
}

function clean() {
    return del(['assets/*']);
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/sass/**/*.scss', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch("./src/sass/**/*.scss").on('change', browserSync.reload);
    gulp.watch("./*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);

gulp.task('build', gulp.series(gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));
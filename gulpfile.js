const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require("gulp-rename");
const uglifycss = require('gulp-uglifycss');

gulp.task('default', () => {
    gulp.src('src/js/typewriter.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'));

    gulp.src('src/js/typewriter.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));

    gulp.src('src/css/typewriter.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'));

    gulp.src('src/css/typewriter.css')
        .pipe(gulp.dest('dist/css'));
});

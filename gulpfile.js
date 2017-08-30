var gulp       = require('gulp'),
	sass         = require('gulp-sass'),
	browserSync  = require('browser-sync'),
	concat       = require('gulp-concat'),
	uglify       = require('gulp-uglifyjs'),
	cssnano      = require('gulp-cssnano'),
	rename       = require('gulp-rename'),
	del          = require('del'),
	imagemin     = require('gulp-imagemin'),
	pngquant     = require('imagemin-pngquant'),
	cache        = require('gulp-cache'),
	postcss = require("gulp-postcss"),
	autoprefixer = require('autoprefixer');
	mqpacker = require("css-mqpacker");

gulp.task('sass', function(){
	return gulp.src('sass/style.scss')
		.pipe(sass())
		.pipe(postcss([
			autoprefixer({browsers: [
				"last 2 version"
				]}),
			mqpacker({
				sort: true
			})
			]))
		.pipe(gulp.dest('css'))
		.pipe(browserSync.reload({stream: true}))
	});

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: '.'
		},
		notify: false
	});
});

gulp.task('scripts', function() {
	return gulp.src([
		'js/*.js',
		])
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('js'));
	});

gulp.task('css-min', ['sass'], function() {
	return gulp.src('css/style.css')
		.pipe(cssnano())
		.pipe(gulp.dest('css'));
	});

gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch('sass/**/*.scss', ['sass']);
	gulp.watch('*.html', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('clean', function() {
	return del.sync('build');
});

gulp.task('img', function() {
	return gulp.src('img/**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('build/img'));
	});

gulp.task('build', ['clean', 'img', 'css-min', 'scripts'], function() {

	var buildCss = gulp.src([
		'css/style.css'
		])
	.pipe(gulp.dest('build/css'))

	var buildFonts = gulp.src('fonts/**/*')
	.pipe(gulp.dest('build/fonts'))

	var buildJs = gulp.src('js/**/*')
	.pipe(gulp.dest('build/js'))

	var buildHtml = gulp.src('*.html')
	.pipe(gulp.dest('build'));

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);

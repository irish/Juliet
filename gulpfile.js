var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	pug = require('gulp-pug'),
	//htmlmin = require('gulp-htmlmin'),
	htmlbeautify = require('gulp-html-beautify'),
	validator = require('gulp-html'),
	imagemin = require('gulp-imagemin'),
	connect = require('gulp-connect');

var paths = {
	sassSource: 'source/assets/scss/',
	jsSource: 	'source/assets/js/',
	compiledCss: 'build/',
	wpdestination: 'wordpress/wp-content/themes/twenty-sixteen-child/'
};

gulp.task('sass', function(){
  //return gulp.src(paths.sassSource + '**/*.scss  ')
  return gulp.src(paths.sassSource + 'style.scss  ')
    .pipe(sass({outputStyle: 'nested'})) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload())
});

gulp.task('html', function(){
  return gulp.src('source/*.pug')
	.pipe(pug())
	.pipe(htmlbeautify({ indentSize: 4 }))
	.pipe(gulp.dest('build/'))
	//.pipe(validator())
    .pipe(connect.reload())
});

// gulp.task('htmlbeautify', function () {
// 	//var options = { indentSize: 2 };
// 	gulp.src('build/*.html')
// 		.pipe(htmlbeautify({ indentSize: 2 }))
// 	.pipe(gulp.dest('build'))
// });

// gulp.task('minify', function() {
// 	return gulp.src('build/*.html')
// 		.pipe(htmlmin({collapseWhitespace: false,removeComments:false,useShortDoctype:true}))
// 		.pipe(gulp.dest('build'));
// });

gulp.task('scripts', function () {
	return gulp.src(paths.jsSource + '**/*.js  ')
		.pipe(concat('app.js'))
		.pipe(gulp.dest('build/js'))
		.pipe(connect.reload())
});

gulp.task('imagemin', () =>
	gulp.src(['source/assets/img/**/*.jpg', 'source/assets/img/**/*.png', 'source/assets/img/**/*.gif'])
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.jpegtran({ progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
        .pipe(gulp.dest('build/img'))
);


gulp.task('copytowp', function() {
	return gulp.src(['build/*.css','source/.htaccess','source/robots.txt','source/screenshot.png','source/sitemap.xml'])
	.pipe(gulp.dest(paths.wpdestination));
});

gulp.task('connect', function() {
	connect.server({
		root: 'build/',
		livereload: true
	});
});

gulp.task('watch', function(){
	gulp.watch(paths.sassSource + '**/*.scss', 	['sass','copytowp']);
	gulp.watch(paths.jsSource + '**/*.js', 	['scripts']);
	gulp.watch('source/img/*', 	['imagemin']);
	gulp.watch('source/**/*.pug', 	['html']);
})

gulp.task('default', [
	'html',
	'sass',
	'scripts',
	'imagemin',
	// 'htmlbeautify',
	'copytowp',
	'connect',
	'watch'
]);
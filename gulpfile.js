var gulp=require('gulp');
var gutil= require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');

gulp.task('log',function(){
	gutil.log('workflows are awesome');
});

var coffeeSources=['components/coffee/*.coffee'];
var sassSources = ['components/sass/style.scss'];


var jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];

gulp.task('coffee',function(){
	gulp.src(coffeeSources)
	.pipe(coffee({bare:true})
		.on('error',gutil.log))
		.pipe(gulp.dest('components/scripts'))
		
});

gulp.task('js',function(){
	gulp.src(jsSources)
		.pipe(concat('script.js').on('error',gutil.log))
		.pipe(browserify())
		.pipe(gulp.dest('builds/development/js'))
		.pipe(connect.reload())
});

gulp.task('compass',function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass:'components/sass',
			image:'builds/development/images',
			sytle:'expanded'
		}))
		.on('error',gutil.log)
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});

gulp.task('connect',function(){
	connect.server({
		root:'builds/development/',
		livereload:true
	});
});

gulp.task('watch',function(){
	gulp.watch(coffeeSources,['coffee']);
	gulp.watch(jsSources,['js']);
	gulp.watch('components/sass/*.scss',['compass']);
})

gulp.task('default', [ 'coffee', 'js', 'compass','connect','watch']);
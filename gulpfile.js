var gulp=require('gulp');
var gutil= require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');

gulp.task('log',function(){
	gutil.log('workflows are awesome');
});

var coffeeSources=['components/coffee/*.coffee'];


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
		.pipe(gulp.dest('builds/development/js'))
});
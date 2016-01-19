var gulp=require('gulp');
var gutil= require('gulp-util');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');
var compass = require('gulp-compass');
var connect = require('gulp-connect');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyHTML = require('gulp-minify-html');

var env,
	coffeeSources,
	sassSources,
	jsSources,
	htmlSources,
	jsonSources,
	outputDir,
	sassStyle;


var env =process.env.NODE_ENV || 'development';

if(env==='development'){
	gutil.log('run development');
	outputDir='builds/development/';
	sassStyle='expanded';
}else{
	gutil.log('run production');
	outputDir='builds/production/'
	sassStyle = 'compressed';
}



coffeeSources=['components/coffee/*.coffee'];
sassSources = ['components/sass/style.scss'];
jsSources = [
  'components/scripts/rclick.js',
  'components/scripts/pixgrid.js',
  'components/scripts/tagline.js',
  'components/scripts/template.js'
];
htmlSources=[outputDir+'*.html'];
jsonSources=[outputDir+'js/*.json'];

gulp.task('log',function(){
	gutil.log('workflows are awesome');
});

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
		.pipe(gulpif(env==='production',uglify()))
		.pipe(gulp.dest(outputDir+'js'))
		.pipe(connect.reload())
});

gulp.task('compass',function(){
	gulp.src(sassSources)
		.pipe(compass({
			sass:'components/sass',
			image:outputDir+'images',
			sytle:sassStyle
		}))
		.on('error',gutil.log)
		.pipe(gulp.dest(outputDir+'css'))
		.pipe(connect.reload())
});


gulp.task('connect',function(){
	connect.server({
		root:outputDir,
		livereload:true
	});
});

gulp.task('html',function(){
	gulp.src('builds/development/*.html')
		.pipe(gulpif(env==='production',minifyHTML()))
		.pipe(gulpif(env==='production',gulp.dest(outputDir)))
		.pipe(connect.reload())
})

gulp.task('json',function(){
	gulp.src(outputDir+'js/*.json')
		.pipe(connect.reload())
})

gulp.task('watch',function(){
	gulp.watch(coffeeSources,['coffee']);
	gulp.watch(jsSources,['js']);
	gulp.watch('components/sass/*.scss',['compass']);
	//gulp.watch(htmlSources,['html']);
	gulp.watch(jsonSources,['json']);
	gulp.watch('builds/development/*.html',['html']);
})

gulp.task('default', ['json','html' ,'coffee', 'js', 'compass','connect','watch']);


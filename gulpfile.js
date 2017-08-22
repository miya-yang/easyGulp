// 引入 gulp 模块
let gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	browserSync = require('browser-sync').create(),
	pngquant = require('imagemin-pngquant');

// 目录地址
let src_css = './src/css',
	dist_css = './dist/css',
	src_js = './src/js',
	dist_js = './dist/js';

// CSS 部分 压缩、文件名MD5后缀、替换目录
gulp.task('mincss', function() {
	gulp.src(src_css + '/**/*.css')
		.pipe(plugins.minifyCss())	// 压缩
		.pipe(gulp.dest(dist_css))
});

// 图片
gulp.task('images', function() {
	gulp.src('./src/img/**/*.{jpg, png, gif, ico}')
		.pipe(plugins.cache(plugins.imagemin({
			progressive: true,
			svgoPlugins: [{ removeViewBox: false }],
			use: [pngquant()]
		})))
		.pipe(gulp.dest('./dist/img'));
});

// HTML
gulp.task('html', function() {
	gulp.src(['./src/**/*.html'])
		.pipe(gulp.dest('./dist'));
});

// ES6
gulp.task('es6-build', function() {
	gulp.src(src_js + '/**/*.js')
		.pipe(plugins.babel({
			presets: ['es2015']
		}))
		.pipe(plugins.uglify())
		//.pipe(plugins.concat('script.min.js'))
		.pipe(gulp.dest(dist_js))
		.pipe(browserSync.stream());
});

// SCSS
gulp.task('scss', function() {
	gulp.src('./src/scss/main.scss')
		.pipe(plugins.sass())
		.pipe(gulp.dest('./src/css'))
		.pipe(browserSync.stream());
});

// 静态服务器
gulp.task('browser-sync', ['scss', 'es6-build'], function() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});
});

// 自动监听
gulp.task('watch', function() {
	// 监听 src/css下的全部.css文件 若有改动则执行名为 'mincss'任务
	gulp.watch(src_css + '/**/*.css', ['mincss']);
	// 监听 src/js下的全部.js文件 若有改动则执行名为'minjs'任务
	gulp.watch(src_js + '/**/*.js', ['es6-build']);
	gulp.watch('./src/**/*.html', ['html']);
	gulp.watch('./src/img/**/*.{jpg, png, gif, ico}', ['images']);
	gulp.watch('./src/scss/**/*.scss', ['scss']);
	gulp.watch('./src/**/*.html').on('change', browserSync.reload);
});

// 默认入口
gulp.task('default', function() {
	gulp.run('es6-build', 'scss', 'mincss', 'html', 'images', 'browser-sync');
	gulp.run('watch');
});
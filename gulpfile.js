var gulp     = require('gulp'),
    concat   = require('gulp-concat'),          //- 多个文件合并为一个；
    cleanCSS = require('gulp-clean-css'),       //- 压缩CSS为一行；
    ugLify   = require('gulp-uglify'),          //压缩js
    imageMin = require('gulp-imagemin'),        //压缩图片
    pngquant = require('imagemin-pngquant'),    // 深度压缩
    htmlMin  = require('gulp-htmlmin'),         //压缩html
    changed  = require('gulp-changed'),         //检查改变状态
    // less     = require('gulp-less')          //压缩合并less
    sass     = require('gulp-sass'),            //压缩合并sass
    rename   = require("gulp-rename");          //重命名  

var del     = require('del')
var browserSync = require("browser-sync").create();//浏览器实时刷新

//删除dist下的所有文件
gulp.task('delete',function(cb){
    // return del(['dist/*','!dist/images'],cb);
    return del(['dist/*'],cb);
})

gulp.task('deleteImg',function(cb){
    // return del(['dist/*','!dist/images'],cb);
    return del(['dist/images/*'],cb);
})

gulp.task('deleteJs',function(cb){
    // return del(['dist/*','!dist/images'],cb);
    return del(['dist/js/*'],cb);
})

gulp.task('deleteCss',function(cb){
    // return del(['dist/*','!dist/images'],cb);
    return del(['dist/css/*'],cb);
})


//压缩html
gulp.task('html', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/index.html')
        .pipe(changed('dist', {hasChanged: changed.compareSha1Digest}))
        .pipe(htmlMin(options))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream:true}));
});

//实时编译less
// gulp.task('less', function () {
//     gulp.src(['./src/less/*.less']) //多个文件以数组形式传入
//         .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))
//         .pipe(less())//编译less文件
//         .pipe(concat('main.css'))//合并之后生成main.css
//         .pipe(cleanCSS())//压缩新生成的css
//         .pipe(gulp.dest('dist/css'))//将会在css下生成main.css
//         .pipe(browserSync.reload({stream:true}));
// });


//合并静态js资源
gulp.task('static', function () {
    gulp.src(['src/static/*.js']) //多个文件以数组形式传入
        .pipe(changed('dist/js', {hasChanged: changed.compareSha1Digest}))
        .pipe(ugLify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream:true}));
});


//实时编译sass
gulp.task('sass', function () {
    gulp.src(['./src/sass/*.scss']) //多个文件以数组形式传入
        .pipe(changed('dist/css', {hasChanged: changed.compareSha1Digest}))
        .pipe(sass())//编译sass文件
        .pipe(concat('main.css'))//合并之后生成main.css
        .pipe(cleanCSS())//压缩新生成的css
        .pipe(gulp.dest('dist/css'))//将会在css下生成main.css
        .pipe(browserSync.reload({stream:true}));
});


//压缩js
gulp.task("script",function(){
    gulp.src(['src/js/**/*.js'])
        .pipe(changed('dist/js', {hasChanged: changed.compareSha1Digest}))
        .pipe(concat('index.js'))
        .pipe(ugLify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({stream:true}));
});

// 压缩图片
gulp.task('images', function () {
    gulp.src(['./src/images/*.*'])
        .pipe(changed('dist/images', {hasChanged: changed.compareSha1Digest}))
        .pipe(imageMin({
            progressive: true,// 无损压缩JPG图片
            svgoPlugins: [{removeViewBox: false}], // 不移除svg的viewbox属性
            use: [pngquant()] // 使用pngquant插件进行深度压缩
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({stream:true}));
});



//启动热更新
gulp.task('serve', ['delete'], function() {
    gulp.start('script','sass','html','static','images');
    browserSync.init({
        port: 2017,
        server: {
            baseDir: ['dist']
        }
    });
    gulp.watch('src/js/*.js', ['script']);         //监控文件变化，自动更新
    // gulp.watch('src/less/*.less', ['less']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    // gulp.watch('src/images/*.*', ['deleteImg','images']);
    gulp.watch('src/images/*.*', ['images']);
    gulp.watch('src/static/*.*', ['static']);
});

gulp.task('default',['serve']);
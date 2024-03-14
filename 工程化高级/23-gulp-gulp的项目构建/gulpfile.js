const { src, dest, series, parallel, watch } = require('gulp')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel') 
const terser = require('gulp-terser')
const less = require('gulp-less')
const inject = require('gulp-inject')

const browserSync = require('browser-sync')

// 1. 对 html 打包
const htmlTask = () => {
    return src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('./build'))
}

// 2. 对 js 打包
const jsTask = () => {
    return src('./src/**/*.js')
        .pipe(babel())
        .pipe(terser({
            keep_fnames: true,
            mangle: {
                toplevel: true
            } 
        }))
        .pipe(dest('./build'))
}

// 3. 对 less 打包
const lessTask = () => {
    return src('./src/**/*.less')
        .pipe(less())
        .pipe(dest('./build'))
}

// 4. 在 html 中注入 js 和 css
const injectTask = () => {
    return src('./build/**/*.html')
        .pipe(inject(src(['./build/**/*.js', './build/**/*.css']), { relative: true }))
        .pipe(dest('./build'))
}

// 5. 开启一个本地服务
const bs = browserSync.create()
const serve = () => {
    watch('./src/**', buildTask)

    bs.init({
        port: 8080,
        open: true,
        // 文件发生修改的时候刷新浏览器
        files: './build/*',
        server: {
            baseDir: './build'
        }
    })
}

// 6. 创建项目构建任务
const buildTask = series(parallel(htmlTask, jsTask, lessTask), injectTask)

const serveTask = series(buildTask, serve)

module.exports = {
    buildTask,
    serveTask
}
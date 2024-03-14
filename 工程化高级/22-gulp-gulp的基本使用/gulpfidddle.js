const { src, dest, watch } = require('gulp')
const babel = require('gulp-babel')
const terser = require('gulp-terser');

const jsTask = () => {
    return src('./src/**/*.js')
        .pipe(babel({
            presets: [
                '@babel/env'
            ]
        }))
        .pipe(terser({
            keep_fnames: true,
            mangle: {
                toplevel: true
            }
          }))
        .pipe(dest('./dist'))
}

// watch 函数，可以监听内容的变化，重新编译
watch('./src/**/*.js', jsTask)

module.exports = {
    jsTask
}
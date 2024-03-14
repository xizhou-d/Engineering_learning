export function parselylics(lyricsString) {
    return []
}

export function test() {}

// 副作用代码
/**
 * 尽量不要有任何副作用的代码，因为会影响优化
 * package 中的 sideEffects 字段，生命所有的文件都没有副作用，因此 terser/usedExports在优化代码的时候可以将没有用到的整个文件都干掉
 */
window.lylics = 'window lyrics message'
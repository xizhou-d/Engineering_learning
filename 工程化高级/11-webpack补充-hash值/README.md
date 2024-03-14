# hash value

## hash
表现：初始打包，所有的 bundle 的 hash 值是一样的，如果修改了任意一个文件，那么所有 bundle 的 hash 值都同时发生变化。
缺点：如果修改任意一个文件，都会对所有的文件都再次打包，影响性能；并且在部署之后，修改一个文件导致所有的文件都被再次打包，也不利于浏览器进行缓存。
结论：尽量不要用 hash

## chunkhash
表现：
    如果入口文件引入了其他文件，两种引入方式
    1. import('./abc.js')   =>  动态引入会分包处理，chunkhash 和 contenthash 区别不大
    2. import './style.css'    =>  chunkhash，修改了主入口文件，主入口文件以及主入口文件引入的其他文件的 chunkhash 也会发生变化

## contenthash
表现：只有有修改的文件的 contenthash 值才会发生改变，部署之后浏览器不会重复下载 contenthash 没有改变的文件
    如果入口文件引入了其他文件，两种引入方式
    1. import('./abc.js')   =>  动态引入会分包处理，chunkhash 和 contenthash 区别不大
    2. import './style.css'    =>  chunkhash，修改了主入口文件，主入口文件的 contenthash 发生了改变，引入的其他文件的 contenthash 不会变化

## 尽量使用 contenthash

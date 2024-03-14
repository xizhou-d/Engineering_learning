const { NodeSSH } = require('node-ssh')

class AutomaticDeploymentWebpackPlugin {
    constructor(options) {
        this.ssh = new NodeSSH()
        this.options = options
    }
    apply(compiler) {
        /**
         * compiler贯穿于整个打包的周期，不同位置有不同的监听，注册插件就是在特定的位置设置要执行的监听事件，完成特定的需求
         * 要自动上传静态文件，需要等到 assets 已经输出到 output 目录里面之后，那么可以在这个节点设置需要执行的任务（自动上传的功能）
         */
        compiler.hooks.afterEmit.tapAsync('uploadAfterEmit', async (compilation, callback) => {
            // 1. 获取 assets 输出的路径
            const assets_path = compilation.outputOptions.path
            console.log('assets_path', assets_path)
            // 2. 连接远程服务器 SSH: node 中需要安装 node-ssh连接服务器
            await this.connectSSH()
            // 3. 删除文件夹中原有的内容
            const remotePath = this.options.remotePath
            this.ssh.execCommand(`rm -rf ${remotePath}`)
            // 4. 上传 assets 到远程服务器
            await this.upload(assets_path, remotePath)
            // 5. 关闭 ssh 连接
            this.ssh.dispose()
            // 完成所有的操作后调用 callback
            callback()
        })
    }

    async connectSSH() {
        await this.ssh.connect({
            host: this.options.host,
            username: this.options.host,
            password: this.options.host,
        })
    }

    async upload(localPath, remotePath) {
        const status = await this.ssh.putDirectory(localPath, remotePath, {
            recursive: true, // 递归上传：文件夹
            concurrency: 10 // 并发
        })

        if (status) {
            console.log('文件上传成功～')
        }
    }
}

module.exports = AutomaticDeploymentWebpackPlugin
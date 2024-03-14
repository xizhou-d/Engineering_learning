# 打包后的文件分析
package.json 文件里面，修改 build 的命令

webpack --config ./config/comm_config.js --env production --profile --json=stats.json

# Node.js 参数传递速查表 🚀

> 一页纸搞定所有参数传递方式！

## 🎯 核心概念 3 秒速记

| 符号 | 含义 | 示例 |
|------|------|------|
| `-` | 短选项 | `-v`, `-abc` |
| `--` | 长选项 | `--verbose`, `--name=John` |
| `=` | 键值对 | `--name=John`, `PORT=3000` |
| `空格` | 位置参数 | `file1.txt file2.txt` |

## 📋 基本语法

```bash
# 布尔标志
-v                    # 短选项
--verbose             # 长选项
-vdh                  # 组合短选项

# 键值对
-n John               # 短选项 + 值
-n=John               # 短选项 + 等号
--name John           # 长选项 + 值
--name=John           # 长选项 + 等号 ✓推荐

# 位置参数
file1.txt file2.txt   # 不带横线

# 环境变量
PORT=3000 node app.js # 在命令前

# 组合
node app.js -vd --name=John --port 8080 file.txt
```

## 🔧 获取方式

### 原生方式

```javascript
// process.argv 数组
process.argv[0]  // node 路径
process.argv[1]  // 脚本路径
process.argv[2]  // 第一个参数
process.argv.slice(2)  // 所有参数

// 环境变量
process.env.PORT
process.env.NODE_ENV
```

### minimist

```javascript
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

// node script.js -v --name=John file.txt
// → { _: ['file.txt'], v: true, name: 'John' }
```

### commander

```javascript
const { program } = require('commander');

program
  .option('-v, --verbose')
  .option('-n, --name <name>')
  .parse();

const opts = program.opts();
// → { verbose: true, name: 'John' }
```

### yargs

```javascript
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('verbose', { type: 'boolean' })
  .option('name', { type: 'string' })
  .parse();

// → { verbose: true, name: 'John' }
```

## 🎨 常见模式

### 帮助信息

```bash
node script.js -h
node script.js --help
```

### 版本信息

```bash
node script.js -V
node script.js --version
```

### 调试模式

```bash
node script.js -d
node script.js --debug
DEBUG=true node script.js
```

### 指定配置

```bash
node script.js --config config.json
node script.js -c config.json
```

### 环境设置

```bash
NODE_ENV=production node script.js
PORT=8080 NODE_ENV=production node script.js
```

### npm scripts

```bash
npm run start
npm run start -- --port 8080
npm run start -- -vd --name=John
```

## 🏆 最佳实践

### ✅ DO

```bash
# 长选项使用完整单词
--verbose --output --environment

# 提供短选项别名
-v --verbose
-o --output
-e --environment

# 键值对使用等号
--name=John
--port=8080

# 配置优先级：CLI > ENV > 配置文件 > 默认值
args.port || process.env.PORT || config.port || 3000
```

### ❌ DON'T

```bash
# 不要用含糊的命名
-o  # output? option? override?

# 不要硬编码敏感信息
const apiKey = 'xxx'  # ✗ 应该用环境变量

# 不要忽略类型转换
const port = process.env.PORT  # ✗ 字符串！
const port = parseInt(process.env.PORT)  # ✓
```

## 🔄 类型转换

```javascript
// 字符串（默认）
const name = args.name

// 数字
const port = parseInt(args.port, 10)
const timeout = parseFloat(args.timeout)

// 布尔
const debug = args.debug === true
const verbose = process.env.VERBOSE === 'true'

// 数组
const tags = args.tags || []
```

## 📊 选择指南

| 需求 | 推荐 | 理由 |
|------|------|------|
| 1-3个参数 | `process.argv` | 简单直接 |
| 简单脚本 | `minimist` | 轻量级 |
| CLI工具 | `commander` | 专业、自动帮助 |
| 复杂验证 | `yargs` | 功能强大 |
| 配置信息 | 环境变量 | 适合部署 |
| 敏感数据 | `.env` + `dotenv` | 安全便捷 |

## 🧪 快速测试

```bash
# 1. 克隆/进入项目
cd 06_node脚本参数传递

# 2. 安装依赖
npm install

# 3. 快速测试
node 01_basic_argv.js -abc --name=John file.txt
node 02_minimist.js -h
node 03_commander.js --help
node 07_complete_example.js --help

# 4. 环境变量测试
PORT=8080 NODE_ENV=production node 06_env_variables.js

# 5. npm scripts 测试
npm run test:args -- --name Alice --port 8080
```

## 🐛 调试技巧

```javascript
// 查看原始参数
console.log('argv:', process.argv);

// 查看解析结果
console.log('args:', JSON.stringify(args, null, 2));

// 查看环境变量
console.log('env:', process.env);

// 条件调试
if (args.debug) {
  console.log('DEBUG:', { args, env: process.env });
}
```

## 📱 实际案例

### 构建脚本

```bash
node build.js --env production --minify --sourcemap
```

### 服务器启动

```bash
PORT=8080 NODE_ENV=production node server.js
```

### 文件处理

```bash
node process.js input.txt output.txt --verbose
```

### 部署脚本

```bash
node deploy.js --region us-east-1 --instances 3 --env production
```

## 🆘 常见问题

### Q: `-` 和 `--` 区别？
A: `-` 单字符，`--` 完整单词

### Q: npm 中为何要 `--`？
A: 分隔 npm 参数和脚本参数

### Q: 环境变量都是字符串？
A: 是的，需要手动转换类型

### Q: 参数优先级？
A: 命令行 > 环境变量 > 配置文件 > 默认值

---

## 📚 完整文档

- `README.md` - 详细文档
- `QUICK_START.md` - 快速入门
- `参数格式对比.md` - 深度对比

## 🎉 开始使用

```bash
# 查看所有示例
ls *.js

# 运行任意示例
node 01_basic_argv.js --help
```

**Happy Coding! 🚀**


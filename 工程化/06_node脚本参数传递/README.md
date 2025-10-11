# Node.js 脚本参数传递完全指南

本项目详细介绍了 Node.js 中各种参数传递方式，包括命令行参数、环境变量等。

## 📋 目录

1. [参数传递方式概览](#参数传递方式概览)
2. [快速开始](#快速开始)
3. [详细说明](#详细说明)
4. [示例文件说明](#示例文件说明)
5. [最佳实践](#最佳实践)

## 参数传递方式概览

### 1. 位置参数 (Positional Arguments)

不带任何前缀的参数，按位置顺序传递。

```bash
node script.js arg1 arg2 arg3
```

**获取方式：**
```javascript
const args = process.argv.slice(2);  // ['arg1', 'arg2', 'arg3']
```

**特点：**
- ✓ 简单直接
- ✓ 适合固定顺序的参数（如文件路径）
- ✗ 顺序敏感
- ✗ 参数含义不明确

---

### 2. 单横线参数 (Short Options) `-`

使用单个横线 + 单个字符，通常用于选项的简写形式。

```bash
node script.js -a -b -c
node script.js -abc        # 组合写法，等同于 -a -b -c
node script.js -n John     # 带值的选项
node script.js -n=John     # 等号形式
```

**获取方式：**
```javascript
// 原生方式需要手动解析
// 使用库（minimist/commander/yargs）自动解析

const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
// { _: [], a: true, b: true, c: true, n: 'John' }
```

**特点：**
- ✓ 简洁，输入快速
- ✓ 可以组合使用（-abc）
- ✓ 常用于布尔标志
- ✗ 只能用单个字符
- ✗ 可读性稍差

---

### 3. 双横线参数 (Long Options) `--`

使用双横线 + 完整单词，提供更好的可读性。

```bash
node script.js --verbose --debug
node script.js --name John
node script.js --name=John
node script.js --port 8080
node script.js --port=8080
```

**获取方式：**
```javascript
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));
// { _: [], verbose: true, debug: true, name: 'John', port: 8080 }
```

**特点：**
- ✓ 可读性强，自描述
- ✓ 支持完整单词
- ✓ 适合复杂选项
- ✗ 输入较长

---

### 4. 等号形式 `key=value`

有两种使用场景：

#### a) 环境变量（在命令前）

```bash
PORT=3000 NODE_ENV=production node script.js
```

**获取方式：**
```javascript
const port = process.env.PORT;  // '3000'
const env = process.env.NODE_ENV;  // 'production'
```

#### b) 参数选项（在命令后）

```bash
node script.js --name=John --port=8080
```

**获取方式：**
```javascript
// 自动被参数解析库处理为 { name: 'John', port: 8080 }
```

**特点：**
- ✓ 明确的键值对关系
- ✓ 环境变量适合配置信息
- ✓ 不会与其他参数混淆

---

### 5. `--` 分隔符

用于分隔选项和位置参数，后面的参数不会被解析为选项。

```bash
node script.js --verbose -- -file-with-dash.txt
```

**使用场景：**
- 文件名以 `-` 开头
- 需要传递原始参数字符串
- 区分脚本选项和传递给子程序的参数

---

### 6. npm scripts 中的参数传递

在 package.json 的 scripts 中：

```json
{
  "scripts": {
    "start": "node script.js",
    "dev": "node script.js --env development"
  }
}
```

**传递额外参数：**
```bash
npm run start -- --port 8080 --verbose
# 实际执行: node script.js --port 8080 --verbose
```

**注意：** npm 需要使用 `--` 来分隔 npm 自己的参数和传递给脚本的参数。

---

## 快速开始

### 安装依赖

```bash
npm install
```

### 运行示例

```bash
# 1. 基础参数解析（原生）
node 01_basic_argv.js -a -b --name=John pos1 pos2

# 2. minimist 示例
node 02_minimist.js -h
node 02_minimist.js -vd --name Alice --port 8080

# 3. commander 示例
node 03_commander.js --help
node 03_commander.js --name Bob --repeat 5

# 4. yargs 示例
node 04_yargs.js --help
node 04_yargs.js --env production -t tag1 -t tag2

# 5. npm scripts 示例
npm run test:args -- --name Alice --port 8080

# 6. 环境变量示例
PORT=8080 NODE_ENV=production node 06_env_variables.js

# 7. 完整示例
node 07_complete_example.js --help
node 07_complete_example.js -dv --name MyApp --port 5000

# 8. dotenv 示例
node 08_dotenv_example.js
```

---

## 详细说明

### 原生 `process.argv`

Node.js 提供的最基础的参数访问方式：

```javascript
// node script.js --name John file.txt
process.argv[0]  // Node.js 可执行文件路径
process.argv[1]  // 当前脚本文件路径
process.argv[2]  // '--name'
process.argv[3]  // 'John'
process.argv[4]  // 'file.txt'
```

**优点：**
- 无需依赖
- 完全控制

**缺点：**
- 需要手动解析
- 代码复杂

---

### 参数解析库对比

| 特性 | minimist | commander | yargs |
|------|----------|-----------|-------|
| 大小 | 最小 (~5KB) | 中等 (~50KB) | 较大 (~200KB) |
| API 风格 | 函数式 | 声明式/链式 | 链式 |
| 自动帮助 | ✗ | ✓ | ✓ |
| 类型验证 | 基础 | 中等 | 强大 |
| 子命令 | ✗ | ✓ | ✓ |
| 学习曲线 | 低 | 中 | 中 |
| 适用场景 | 简单脚本 | CLI 工具 | 复杂 CLI |

**选择建议：**
- **简单脚本**：使用 `minimist` 或原生 `process.argv`
- **CLI 工具**：使用 `commander`
- **复杂参数验证**：使用 `yargs`

---

## 示例文件说明

| 文件 | 说明 |
|------|------|
| `01_basic_argv.js` | 原生 process.argv 解析，展示手动解析各种参数格式 |
| `02_minimist.js` | minimist 库使用示例，轻量级参数解析 |
| `03_commander.js` | commander 库示例，声明式 CLI 框架 |
| `04_yargs.js` | yargs 库示例，功能最丰富的参数解析库 |
| `05_npm_scripts.js` | npm scripts 中的参数传递方式 |
| `06_env_variables.js` | 环境变量的传递和获取 |
| `07_complete_example.js` | 综合示例，展示配置优先级和最佳实践 |
| `08_dotenv_example.js` | dotenv 环境变量管理 |
| `example-config.json` | 示例配置文件 |
| `.env.example` | 环境变量配置模板 |

---

## 最佳实践

### 1. 参数优先级

推荐的配置优先级（从高到低）：

1. **命令行参数** - 最高优先级，用于临时覆盖
2. **环境变量** - 适合部署配置
3. **配置文件** - 适合项目配置
4. **默认值** - 兜底配置

```javascript
const config = {
  port: args.port || process.env.PORT || configFile.port || 3000
};
```

### 2. 环境变量命名规范

```bash
# ✓ 好的命名
NODE_ENV=production
DATABASE_URL=postgresql://...
API_KEY=xxx
LOG_LEVEL=debug

# ✗ 避免的命名
env=production        # 太短
db=postgresql://...   # 不清晰
key=xxx              # 太通用
```

### 3. 敏感信息处理

```javascript
// ✓ 使用环境变量
const apiKey = process.env.API_KEY;

// ✗ 硬编码
const apiKey = 'abc123...';  // 不要这样做！

// ✓ 使用 .env 文件（不提交到 git）
require('dotenv').config();

// ✓ 验证必需的环境变量
const required = ['DATABASE_URL', 'API_KEY'];
const missing = required.filter(key => !process.env[key]);
if (missing.length > 0) {
  console.error('Missing required env vars:', missing);
  process.exit(1);
}
```

### 4. 帮助信息

始终提供清晰的帮助信息：

```javascript
if (args.help) {
  console.log(`
用法: script.js [选项] [文件...]

选项:
  -h, --help     显示帮助信息
  -v, --verbose  详细输出
  -p, --port     指定端口 (默认: 3000)

示例:
  node script.js --port 8080
  node script.js -v file1.txt file2.txt
  `);
  process.exit(0);
}
```

### 5. 类型转换和验证

```javascript
// ✓ 类型转换
const port = parseInt(process.env.PORT || '3000', 10);
const debug = process.env.DEBUG === 'true';
const timeout = parseFloat(process.env.TIMEOUT || '5.0');

// ✓ 验证
if (port < 0 || port > 65535) {
  console.error('Invalid port number');
  process.exit(1);
}
```

### 6. 跨平台兼容性

```bash
# ✗ 只在 Unix 系统工作
PORT=3000 node script.js

# ✓ 跨平台方案
npm install cross-env
cross-env PORT=3000 node script.js
```

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```

---

## 参数传递总结表

| 方式 | 语法 | 获取方式 | 适用场景 |
|------|------|---------|---------|
| 位置参数 | `arg1 arg2` | `process.argv[2]` | 固定顺序的输入 |
| 短选项 | `-a -b` | 解析库 | 布尔标志 |
| 短选项+值 | `-n John` | 解析库 | 简短的选项 |
| 长选项 | `--name` | 解析库 | 描述性选项 |
| 长选项+值 | `--name=John` | 解析库 | 清晰的配置 |
| 环境变量 | `PORT=3000` | `process.env.PORT` | 配置信息 |
| 配置文件 | JSON/YAML | `require()` | 复杂配置 |
| .env 文件 | `KEY=value` | dotenv | 本地开发配置 |

---

## 常见问题

### Q1: `-` 和 `--` 的区别？

- `-` 单横线：用于单字符选项（短选项），如 `-v`、`-a`
- `--` 双横线：用于完整单词选项（长选项），如 `--verbose`、`--all`
- 惯例：短选项和长选项可以同时定义为别名

### Q2: 何时使用环境变量，何时使用命令行参数？

- **环境变量**：配置信息、敏感数据、部署配置、容器化环境
- **命令行参数**：运行时选项、临时覆盖、调试开关、文件路径

### Q3: npm scripts 中为什么要用 `--` 分隔？

npm 需要区分哪些参数是给 npm 的，哪些是给脚本的：

```bash
npm run start -- --port 8080
#             ^^
#             这个 -- 告诉 npm："后面的参数传给脚本"
```

### Q4: 如何处理包含空格的参数？

使用引号：

```bash
node script.js --message "Hello World"
node script.js --message='Hello World'
```

### Q5: 参数解析库该选哪个？

- 简单脚本 → `minimist` 或原生
- CLI 工具 → `commander`
- 复杂验证 → `yargs`

---

## 调试技巧

### 查看原始参数

```javascript
console.log('原始参数:', process.argv);
```

### 查看解析结果

```javascript
console.log('解析后:', JSON.stringify(args, null, 2));
```

### 查看所有环境变量

```javascript
console.log('环境变量:', process.env);
```

### 调试模式

```javascript
if (args.debug) {
  console.log('=== DEBUG INFO ===');
  console.log('argv:', process.argv);
  console.log('parsed:', args);
  console.log('env:', process.env);
}
```

---

## 参考资源

- [Node.js process.argv 文档](https://nodejs.org/api/process.html#process_process_argv)
- [minimist](https://github.com/minimistjs/minimist)
- [commander.js](https://github.com/tj/commander.js)
- [yargs](https://github.com/yargs/yargs)
- [dotenv](https://github.com/motdotla/dotenv)

---

## 许可证

MIT


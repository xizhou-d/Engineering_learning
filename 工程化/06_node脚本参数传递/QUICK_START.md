# 快速开始指南 🚀

这是一个关于 Node.js 参数传递的完整示例项目。5分钟快速了解所有参数传递方式！

## 📊 参数传递方式速览

| 方式 | 示例 | 说明 |
|------|------|------|
| **单横线 `-`** | `node script.js -a -b -c` | 短选项，可组合 `-abc` |
| **双横线 `--`** | `node script.js --verbose` | 长选项，更清晰 |
| **等号形式** | `node script.js --name=John` | 键值对，明确 |
| **空格分隔** | `node script.js --port 8080` | 选项+值 |
| **位置参数** | `node script.js file1.txt file2.txt` | 不带横线 |
| **环境变量** | `PORT=3000 node script.js` | 配置信息 |

## 🎯 核心区别

### 1. 单横线 `-` vs 双横线 `--`

```bash
# 单横线：短选项（单字符）
node script.js -v -d -h
node script.js -vdh        # 可以组合！

# 双横线：长选项（完整单词）
node script.js --verbose --debug --help
```

**区别：**
- `-` 用于简写，输入快速，可组合使用
- `--` 用于完整单词，更具可读性和自描述性

### 2. 等号 `=` vs 空格 ` `

```bash
# 使用等号
node script.js --name=John --port=8080

# 使用空格
node script.js --name John --port 8080
```

**区别：**
- 功能完全相同，只是语法不同
- 等号形式更明确，避免歧义
- 空格形式更常见

### 3. 命令行参数 vs 环境变量

```bash
# 命令行参数（在命令后面）
node script.js --port 8080

# 环境变量（在命令前面）
PORT=8080 node script.js
```

**区别：**
- **命令行参数**：运行时选项，灵活，易于调试
- **环境变量**：配置信息，适合敏感数据，容器化部署

## 🏃‍♂️ 5分钟快速体验

### 步骤 1：安装依赖（如果还没安装）

```bash
npm install
```

### 步骤 2：运行基础示例

```bash
# 1. 原生参数解析 - 看看各种格式如何被解析
node 01_basic_argv.js -abc --name=John --port 8080 file1.txt file2.txt

# 2. minimist 库 - 自动解析，超简单
node 02_minimist.js -h
node 02_minimist.js -vd --name Alice --port 8080

# 3. commander 库 - 专业 CLI 工具
node 03_commander.js --help
node 03_commander.js --name Bob --repeat 5 file1.txt

# 4. yargs 库 - 功能最强大
node 04_yargs.js --help
node 04_yargs.js --env production --tags tag1 tag2 tag3

# 5. 环境变量
PORT=8080 NODE_ENV=production node 06_env_variables.js

# 6. 完整示例 - 看配置优先级
node 07_complete_example.js --help
PORT=9999 node 07_complete_example.js --name MyApp --config example-config.json
```

### 步骤 3：通过 npm scripts 运行

```bash
# 测试 npm scripts 中的参数传递
npm run test:args
npm run test:args -- --name Alice --port 8080

# 测试环境变量
npm run test:env

# 运行完整示例
npm run example -- --verbose --port 5000
```

## 💡 实际应用场景

### 场景 1：简单脚本 - 原生 process.argv

```javascript
// deploy.js - 简单的部署脚本
const args = process.argv.slice(2);
const env = args[0] || 'development';

console.log(`部署到 ${env} 环境...`);
```

```bash
node deploy.js production
```

### 场景 2：配置驱动 - minimist

```javascript
// build.js - 构建脚本
const minimist = require('minimist');
const args = minimist(process.argv.slice(2));

const config = {
  minify: args.minify || false,
  sourcemap: args.sourcemap || true,
  output: args.output || './dist'
};
```

```bash
node build.js --minify --output ./build
```

### 场景 3：CLI 工具 - commander

```javascript
// cli.js - 命令行工具
const { program } = require('commander');

program
  .option('-d, --debug', '调试模式')
  .option('-p, --port <port>', '端口', '3000')
  .parse();
```

```bash
node cli.js --debug --port 8080
```

### 场景 4：环境配置 - 环境变量

```javascript
// server.js - Web 服务器
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';

app.listen(port, () => {
  console.log(`Server running in ${nodeEnv} on port ${port}`);
});
```

```bash
PORT=8080 NODE_ENV=production node server.js
```

## 🎓 进阶技巧

### 技巧 1：配置优先级

推荐的配置优先级（从高到低）：

1. **命令行参数** ← 最高优先级
2. **环境变量**
3. **配置文件**
4. **默认值** ← 最低优先级

```javascript
const config = {
  port: args.port || process.env.PORT || configFile.port || 3000
};
```

查看完整示例：
```bash
node 07_complete_example.js --help
```

### 技巧 2：npm scripts 中传递参数

在 `package.json` 中：

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js --watch"
  }
}
```

传递额外参数需要使用 `--`：

```bash
# ✓ 正确
npm run start -- --port 8080

# ✗ 错误（--port 会被 npm 接收，而不是传给脚本）
npm run start --port 8080
```

### 技巧 3：环境变量文件 (.env)

创建 `.env` 文件：

```
PORT=3000
NODE_ENV=development
API_KEY=your-api-key
```

在代码中加载：

```javascript
require('dotenv').config();
const port = process.env.PORT;
```

查看示例：
```bash
node 08_dotenv_example.js
```

## 📚 选择哪种方式？

### 简单脚本（< 5个参数）

使用**原生 process.argv** 或 **minimist**

```bash
node script.js file1.txt file2.txt --verbose
```

### CLI 工具（需要帮助信息）

使用 **commander** 或 **yargs**

```bash
node cli.js --help
node cli.js --version
```

### 配置信息/敏感数据

使用**环境变量** + **dotenv**

```bash
PORT=8080 node server.js
# 或使用 .env 文件
```

### 复杂应用

综合使用：**命令行参数 + 环境变量 + 配置文件**

```bash
PORT=8080 node app.js --config config.json --verbose
```

## 🔍 调试技巧

### 查看原始参数

```javascript
console.log(process.argv);
```

### 查看解析结果

```javascript
console.log(JSON.stringify(args, null, 2));
```

### 查看环境变量

```javascript
console.log(process.env);
```

### 启用调试模式

```bash
node script.js --debug
DEBUG=true node script.js
```

## 📖 完整文档

查看 `README.md` 获取更详细的说明。

## 🎯 常见问题

### Q: 为什么有时用 `-`，有时用 `--`？

A: 这是 Unix/Linux 的惯例：
- `-` 用于单字符选项：`-v`, `-h`, `-a`
- `--` 用于完整单词：`--verbose`, `--help`, `--all`
- 通常它们是别名关系：`-v` = `--verbose`

### Q: `npm run start -- --port 8080` 中的 `--` 是什么？

A: 这是分隔符，告诉 npm："后面的参数传给脚本，不是给 npm 的"。

### Q: 环境变量和命令行参数，用哪个？

A: 
- **环境变量**：配置、密钥、部署设置
- **命令行参数**：运行选项、临时覆盖、调试开关

### Q: 参数解析库选哪个？

A:
- 简单脚本 → `minimist`
- CLI 工具 → `commander`
- 复杂验证 → `yargs`

## 🚀 下一步

1. ✅ 浏览所有示例文件（01-08）
2. ✅ 运行每个示例，观察输出
3. ✅ 尝试修改参数，看看效果
4. ✅ 在自己的项目中应用

祝你编码愉快！🎉


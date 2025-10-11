# cross-env 跨平台简明指南

## 🎯 一句话总结

**cross-env 让你用一套代码在 Windows、macOS、Linux 上设置环境变量，无需为不同平台写不同的命令。**

---

## 🤔 什么是"跨平台"？

**跨平台 = 同一段代码可以在不同操作系统上运行，无需修改**

不同操作系统设置环境变量的语法不同：

```bash
# macOS/Linux (bash/zsh)
NODE_ENV=production node server.js     ✅ 可以运行

# Windows (cmd)
NODE_ENV=production node server.js     ❌ 报错！
set NODE_ENV=production && node server.js   ✅ 需要这样写

# Windows (PowerShell)
$env:NODE_ENV="production"; node server.js  ✅ 又是另一种语法
```

---

## 😱 问题场景

你在 `package.json` 中这样写：

```json
{
  "scripts": {
    "start": "NODE_ENV=production node server.js"
  }
}
```

**结果：**
- ✅ macOS/Linux 团队成员：能跑
- ❌ Windows 团队成员：报错
- 😭 团队协作困难！

---

## ✨ cross-env 的解决方案

### 安装

```bash
npm install --save-dev cross-env
```

### 使用

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```

**魔法效果：**
- ✅ macOS/Linux：正常运行
- ✅ Windows (cmd)：正常运行
- ✅ Windows (PowerShell)：正常运行
- 🎉 所有人都开心！

---

## 📖 语法对比

### ❌ 不使用 cross-env（无法跨平台）

| 平台 | 命令 | 结果 |
|------|------|------|
| macOS/Linux | `NODE_ENV=production node app.js` | ✅ 正常 |
| Windows cmd | `NODE_ENV=production node app.js` | ❌ 报错 |
| Windows cmd | `set NODE_ENV=production && node app.js` | ✅ 正常 |
| Windows PS | `$env:NODE_ENV="production"; node app.js` | ✅ 正常 |

**问题：需要根据平台写不同的命令！**

### ✅ 使用 cross-env（完美跨平台）

| 平台 | 命令 | 结果 |
|------|------|------|
| macOS/Linux | `cross-env NODE_ENV=production node app.js` | ✅ 正常 |
| Windows cmd | `cross-env NODE_ENV=production node app.js` | ✅ 正常 |
| Windows PS | `cross-env NODE_ENV=production node app.js` | ✅ 正常 |

**完美：所有平台用同一个命令！**

---

## 🚀 使用示例

### 基础用法

```bash
# 设置单个环境变量
cross-env NODE_ENV=production node server.js

# 设置多个环境变量
cross-env NODE_ENV=production PORT=8080 DEBUG=true node server.js

# 与命令行参数组合
cross-env NODE_ENV=production node server.js --port 8080 --verbose
```

### package.json 中的实际应用

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node server.js",
    "prod": "cross-env NODE_ENV=production node server.js",
    "test": "cross-env NODE_ENV=test jest",
    "build": "cross-env NODE_ENV=production webpack",
    "start": "cross-env PORT=8080 NODE_ENV=production node server.js"
  }
}
```

### 访问环境变量

```javascript
// server.js
console.log('环境:', process.env.NODE_ENV);  // "production"
console.log('端口:', process.env.PORT);       // "8080"

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
```

---

## 💡 为什么说是"工程美学"？

### 1. 优雅的抽象层 🎨
- **隐藏复杂性**：你不需要知道每个平台怎么设置环境变量
- **统一接口**：只需要记住一种语法
- **专注业务**：不用为平台差异分心

### 2. 团队协作友好 🤝
- **统一开发体验**：Windows 和 Mac 开发者用同样的命令
- **减少问题**：不会因为"在我电脑上能跑"而争论
- **CI/CD 稳定**：同一套脚本在所有环境运行

### 3. 开箱即用 📦
- **零配置**：安装即用
- **零学习成本**：语法简单直观
- **透明实现**：感觉就像原生支持一样

---

## 🎯 何时使用 cross-env？

### ✅ 推荐使用的场景

1. **npm scripts 中需要设置环境变量**
   ```json
   "scripts": {
     "start": "cross-env NODE_ENV=production node app.js"
   }
   ```

2. **团队成员使用不同操作系统**
   - 团队中有人用 Mac，有人用 Windows

3. **开源项目**
   - 用户可能用任何平台

4. **CI/CD 流水线**
   - 可能在不同平台的容器中运行

### ❌ 不需要使用的场景

1. **直接在终端中临时设置**
   - 如果你只是在自己电脑上临时测试，用原生语法更快

2. **生产环境**
   - 生产环境通常用 `.env` 文件或系统环境变量
   - cross-env 主要用于开发和构建脚本

---

## 📊 工作原理

```
你执行: cross-env NODE_ENV=production node app.js
         ↓
cross-env 检测操作系统
         ↓
    ┌─────┴─────┐
    ↓           ↓
  macOS      Windows
    ↓           ↓
NODE_ENV=... set NODE_ENV=...
    ↓           ↓
  node app.js
    ↓
process.env.NODE_ENV === "production" ✅
```

---

## 🧪 快速测试

在你的项目中试试：

```bash
# 1. 确保已安装
npm list cross-env

# 2. 直接在终端测试
cross-env NODE_ENV=test node -e "console.log(process.env.NODE_ENV)"
# 输出: test

# 3. 运行项目中的示例
npm run cross-env:test

# 4. 查看详细解释
node 09_cross_env_explained.js
```

---

## 📚 对比总结

| 特性 | 原生语法 | cross-env |
|------|---------|-----------|
| 跨平台 | ❌ 需要不同写法 | ✅ 统一写法 |
| 学习成本 | 😰 需要学多种语法 | 😊 只学一种 |
| 团队协作 | ❌ 容易出问题 | ✅ 无缝协作 |
| CI/CD | ⚠️ 需要判断平台 | ✅ 直接使用 |
| 安装 | ✅ 无需安装 | ⚠️ 需要安装 |
| 性能 | ✅ 原生，最快 | ✅ 几乎无开销 |

---

## 🎓 核心概念总结

1. **跨平台的本质**
   - 不同操作系统有不同的命令语法
   - cross-env 自动适配当前平台

2. **环境变量的作用**
   - 配置应用行为（开发/生产模式）
   - 传递敏感信息（API 密钥）
   - 控制功能开关

3. **命令前环境变量 vs 命令行参数**
   ```bash
   # 环境变量（在命令前面）
   PORT=8080 node app.js
   获取方式: process.env.PORT
   
   # 命令行参数（在命令后面）
   node app.js --port 8080
   获取方式: process.argv 或解析库
   ```

---

## 💼 实际项目中的最佳实践

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon server.js",
    "start": "cross-env NODE_ENV=production node server.js",
    "test": "cross-env NODE_ENV=test jest",
    "test:watch": "cross-env NODE_ENV=test jest --watch",
    "build": "cross-env NODE_ENV=production webpack",
    "build:dev": "cross-env NODE_ENV=development webpack"
  }
}
```

---

## 🔗 相关资源

- 📦 npm 包: [cross-env](https://www.npmjs.com/package/cross-env)
- 📖 本项目示例: `09_cross_env_explained.js`
- 🧪 测试命令: `npm run cross-env:test`

---

## ❓ 常见问题

### Q: cross-env 和 dotenv 有什么区别？

**A: 用途不同**

- **cross-env**: 在命令中临时设置环境变量（跨平台）
  ```bash
  cross-env NODE_ENV=production node app.js
  ```

- **dotenv**: 从 `.env` 文件加载环境变量（持久化配置）
  ```bash
  # .env 文件
  NODE_ENV=production
  PORT=8080
  ```

**通常一起使用：**
```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node -r dotenv/config server.js"
  }
}
```

### Q: 为什么不直接用 Windows 的语法？

**A: 因为无法跨平台**

如果你写 `set NODE_ENV=production && node app.js`：
- ❌ 在 macOS/Linux 上会失败
- 团队协作困难

### Q: 生产环境也需要 cross-env 吗？

**A: 通常不需要**

- 开发环境：用 cross-env 设置临时变量
- 生产环境：用系统环境变量或 `.env` 文件
- CI/CD：可以用 cross-env，也可以用平台提供的环境变量管理

---

## 🎉 总结

**cross-env 做了一件简单但重要的事：**

让你不用关心操作系统的差异，用统一的方式设置环境变量。

这就是"工程美学"——**优雅地解决真实世界的复杂问题**。


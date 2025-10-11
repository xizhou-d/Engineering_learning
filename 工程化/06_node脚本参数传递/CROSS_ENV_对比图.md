# cross-env 跨平台对比图

## 📊 问题场景可视化

### 场景 1：没有 cross-env 的痛苦

```
开发团队：
├── Alice (macOS)      → 写代码：PORT=3000 node app.js ✅
├── Bob (Linux)        → 运行代码：PORT=3000 node app.js ✅
└── Charlie (Windows)  → 运行代码：PORT=3000 node app.js ❌ 报错！

Charlie 说："这代码有问题！"
Alice 说："在我电脑上能跑啊！"（经典回复 😅）

Charlie 只能改成：set PORT=3000 && node app.js
但这样又在 macOS/Linux 上无法运行了... 😭
```

---

### 场景 2：使用 cross-env 的和谐

```
开发团队：
├── Alice (macOS)      → cross-env PORT=3000 node app.js ✅
├── Bob (Linux)        → cross-env PORT=3000 node app.js ✅
└── Charlie (Windows)  → cross-env PORT=3000 node app.js ✅

所有人：统一的命令，完美运行！🎉
```

---

## 🔄 cross-env 工作流程图

```
                你执行的命令
                     ↓
      cross-env PORT=3000 node app.js
                     ↓
            cross-env 检测系统
                     ↓
        ┌────────────┼────────────┐
        ↓            ↓            ↓
    macOS/Linux   Windows cmd   Windows PS
        ↓            ↓            ↓
  PORT=3000...   set PORT=...  $env:PORT=...
        ↓            ↓            ↓
        └────────────┼────────────┘
                     ↓
              node app.js 执行
                     ↓
    process.env.PORT === "3000" ✅
```

---

## 📈 不同平台的环境变量语法对比

### 对比表格

| 平台 | 设置环境变量语法 | 示例 | 在其他平台能用吗？ |
|------|----------------|------|------------------|
| **macOS/Linux (bash/zsh)** | `KEY=VALUE command` | `PORT=3000 node app.js` | ❌ Windows 不支持 |
| **Windows (cmd)** | `set KEY=VALUE && command` | `set PORT=3000 && node app.js` | ❌ Unix 不支持 |
| **Windows (PowerShell)** | `$env:KEY="VALUE"; command` | `$env:PORT="3000"; node app.js` | ❌ 其他都不支持 |
| **cross-env (全平台)** | `cross-env KEY=VALUE command` | `cross-env PORT=3000 node app.js` | ✅ 所有平台都支持 |

---

## 🎯 实际案例对比

### 案例：package.json 中的脚本

#### ❌ 方案 A：只用 Unix 语法（不跨平台）

```json
{
  "scripts": {
    "dev": "NODE_ENV=development node server.js",
    "prod": "NODE_ENV=production node server.js"
  }
}
```

**结果：**
```
macOS/Linux 开发者：npm run dev ✅
Windows 开发者：     npm run dev ❌ 报错
```

---

#### ❌ 方案 B：只用 Windows 语法（不跨平台）

```json
{
  "scripts": {
    "dev": "set NODE_ENV=development && node server.js",
    "prod": "set NODE_ENV=production && node server.js"
  }
}
```

**结果：**
```
Windows 开发者：     npm run dev ✅
macOS/Linux 开发者：npm run dev ❌ 报错
```

---

#### ❌ 方案 C：写两套脚本（维护噩梦）

```json
{
  "scripts": {
    "dev": "NODE_ENV=development node server.js",
    "dev:win": "set NODE_ENV=development && node server.js",
    "prod": "NODE_ENV=production node server.js",
    "prod:win": "set NODE_ENV=production && node server.js"
  }
}
```

**结果：**
```
• macOS/Linux 用 npm run dev
• Windows 用 npm run dev:win
• 需要维护两套命令
• 容易出错
• 文档复杂
```

---

#### ✅ 方案 D：使用 cross-env（完美解决）

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node server.js",
    "prod": "cross-env NODE_ENV=production node server.js"
  }
}
```

**结果：**
```
所有开发者：npm run dev ✅
• 统一的命令
• 零维护成本
• 简单清晰
```

---

## 💡 为什么叫"工程美学"？

### 对比维度

| 维度 | 原生语法 | cross-env | 工程美学体现 |
|------|---------|-----------|------------|
| **简洁性** | 😰 需要记3种语法 | 😊 只需1种 | ✨ 简约之美 |
| **一致性** | ❌ 因平台而异 | ✅ 完全一致 | ✨ 统一之美 |
| **可维护性** | ❌ 需要维护多套 | ✅ 只有一套 | ✨ 优雅之美 |
| **协作性** | ❌ 容易冲突 | ✅ 无缝协作 | ✨ 和谐之美 |
| **学习成本** | 😰 高 | 😊 低 | ✨ 实用之美 |
| **抽象层次** | 😰 暴露细节 | 😊 隐藏复杂性 | ✨ 抽象之美 |

---

## 🔍 深入理解：cross-env 如何实现跨平台

### 底层逻辑

```javascript
// cross-env 的简化实现逻辑

function crossEnv(args) {
  // 1. 解析环境变量和命令
  const { envVars, command } = parseArgs(args);
  
  // 2. 检测当前平台
  const platform = process.platform;
  
  // 3. 根据平台设置环境变量
  if (platform === 'win32') {
    // Windows: 使用 set 命令
    // set KEY1=VALUE1 && set KEY2=VALUE2 && command
  } else {
    // Unix: 直接设置
    // KEY1=VALUE1 KEY2=VALUE2 command
  }
  
  // 4. 执行命令
  executeCommand(command, envVars);
}
```

### 关键点

1. **自动检测**：`process.platform` 识别操作系统
2. **智能适配**：根据平台选择正确的语法
3. **透明执行**：用户无感知，就像原生支持
4. **零副作用**：临时环境变量，不污染系统

---

## 📚 与其他工具的关系

```
环境变量管理工具生态：

┌─────────────────────────────────────────┐
│                                         │
│  dotenv                                 │
│  从 .env 文件加载环境变量                 │
│  用途：持久化配置                         │
│                                         │
└─────────────────────────────────────────┘
                  +
┌─────────────────────────────────────────┐
│                                         │
│  cross-env                              │
│  跨平台设置临时环境变量                    │
│  用途：命令行中临时设置（npm scripts）      │
│                                         │
└─────────────────────────────────────────┘
                  +
┌─────────────────────────────────────────┐
│                                         │
│  env-cmd                                │
│  从文件加载并设置环境变量后执行命令          │
│  用途：结合文件和命令                      │
│                                         │
└─────────────────────────────────────────┘
                  ↓
         完整的环境变量解决方案
```

---

## 🎓 实战示例：真实项目场景

### 场景：React 项目

```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=development react-scripts start",
    "build": "cross-env NODE_ENV=production react-scripts build",
    "test": "cross-env NODE_ENV=test react-scripts test",
    "build:staging": "cross-env NODE_ENV=staging REACT_APP_API_URL=https://staging-api.com react-scripts build",
    "build:prod": "cross-env NODE_ENV=production REACT_APP_API_URL=https://api.com react-scripts build"
  }
}
```

### 场景：Node.js 后端

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development nodemon server.js",
    "start": "cross-env NODE_ENV=production node server.js",
    "debug": "cross-env NODE_ENV=development DEBUG=* node server.js",
    "test": "cross-env NODE_ENV=test jest",
    "test:coverage": "cross-env NODE_ENV=test jest --coverage"
  }
}
```

### 场景：Webpack 构建

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack",
    "build:analyze": "cross-env NODE_ENV=production ANALYZE=true webpack",
    "dev": "cross-env NODE_ENV=development webpack serve"
  }
}
```

---

## 🎯 总结：一句话理解

**cross-env 让你不用关心用户在什么操作系统上运行代码，用统一的语法设置环境变量。**

这就是**工程美学**的核心：
- ✨ **简洁**：一种语法解决所有问题
- ✨ **优雅**：隐藏平台差异的复杂性
- ✨ **实用**：真正解决实际开发中的痛点

---

## 🚀 快速开始

```bash
# 1. 安装
npm install --save-dev cross-env

# 2. 在 package.json 中使用
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node server.js"
  }
}

# 3. 运行
npm run start

# 4. 享受跨平台的和谐！🎉
```

---

**记住：跨平台 = 一套代码，到处运行！**


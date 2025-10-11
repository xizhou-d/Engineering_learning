/**
 * 09_cross-env 跨平台环境变量
 * 
 * 什么是"跨平台"？为什么需要 cross-env？
 */

console.log('=== cross-env 跨平台详解 ===\n');

console.log('📌 核心问题：不同操作系统设置环境变量的语法不同\n');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('1️⃣  在 Unix/Linux/macOS 系统上 (bash/zsh)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('✅ 可以这样设置环境变量：');
console.log('   PORT=3000 NODE_ENV=production node server.js');
console.log('');
console.log('   工作原理：');
console.log('   • 在命令前面用 KEY=VALUE 格式设置临时环境变量');
console.log('   • 这些变量只在当前命令执行期间有效');
console.log('   • 通过 process.env.PORT 和 process.env.NODE_ENV 访问');
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('2️⃣  在 Windows 系统上 (cmd.exe)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('❌ Unix 语法不工作：');
console.log('   PORT=3000 node server.js    ← 会报错！');
console.log('');
console.log('✅ Windows 需要使用 set 命令：');
console.log('   set PORT=3000 && node server.js');
console.log('');
console.log('   或者在 PowerShell 中：');
console.log('   $env:PORT=3000; node server.js');
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('3️⃣  这就造成了问题：代码无法跨平台运行！');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('package.json 中的问题：');
console.log('{');
console.log('  "scripts": {');
console.log('    "start": "PORT=3000 node server.js"');
console.log('  }');
console.log('}');
console.log('');
console.log('问题：');
console.log('  ✅ 在 macOS/Linux 上能运行');
console.log('  ❌ 在 Windows 上会失败');
console.log('  → 团队协作困难！');
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('4️⃣  cross-env 的优雅解决方案 🎨');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('安装：');
console.log('  npm install --save-dev cross-env');
console.log('');

console.log('使用统一语法：');
console.log('  cross-env PORT=3000 NODE_ENV=production node server.js');
console.log('');

console.log('在 package.json 中：');
console.log('{');
console.log('  "scripts": {');
console.log('    "start": "cross-env PORT=3000 NODE_ENV=production node server.js",');
console.log('    "dev": "cross-env NODE_ENV=development node server.js",');
console.log('    "prod": "cross-env NODE_ENV=production node server.js"');
console.log('  }');
console.log('}');
console.log('');

console.log('✨ cross-env 的魔法：');
console.log('  • 自动检测当前操作系统');
console.log('  • 在 Windows 上自动转换为 set 命令');
console.log('  • 在 Unix 系统上直接使用原生语法');
console.log('  • 开发者只需要写一套代码！');
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('5️⃣  实际对比示例');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('❌ 不使用 cross-env（无法跨平台）：');
console.log('┌─────────────────────────────────────────────────┐');
console.log('│ package.json                                    │');
console.log('├─────────────────────────────────────────────────┤');
console.log('│ {                                               │');
console.log('│   "scripts": {                                  │');
console.log('│     "start": "NODE_ENV=production node app.js"  │');
console.log('│   }                                             │');
console.log('│ }                                               │');
console.log('└─────────────────────────────────────────────────┘');
console.log('  macOS/Linux: ✅ 正常运行');
console.log('  Windows:     ❌ 报错');
console.log('');

console.log('✅ 使用 cross-env（完美跨平台）：');
console.log('┌─────────────────────────────────────────────────────────────┐');
console.log('│ package.json                                                │');
console.log('├─────────────────────────────────────────────────────────────┤');
console.log('│ {                                                           │');
console.log('│   "scripts": {                                              │');
console.log('│     "start": "cross-env NODE_ENV=production node app.js"    │');
console.log('│   }                                                         │');
console.log('│ }                                                           │');
console.log('└─────────────────────────────────────────────────────────────┘');
console.log('  macOS/Linux: ✅ 正常运行');
console.log('  Windows:     ✅ 正常运行');
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('6️⃣  高级用法');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('设置多个环境变量：');
console.log('  cross-env NODE_ENV=production PORT=8080 DEBUG=true node app.js');
console.log('');

console.log('与其他参数组合：');
console.log('  cross-env NODE_ENV=production node app.js --port 8080 --verbose');
console.log('');

console.log('在 scripts 中组合使用：');
console.log('{');
console.log('  "scripts": {');
console.log('    "start": "cross-env NODE_ENV=production node server.js",');
console.log('    "start:port": "cross-env NODE_ENV=production node server.js --port 8080",');
console.log('    "test": "cross-env NODE_ENV=test jest",');
console.log('    "build": "cross-env NODE_ENV=production webpack"');
console.log('  }');
console.log('}');
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('7️⃣  为什么说是"工程美学"？');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('🎨 优雅的抽象层：');
console.log('  • 隐藏了平台差异的复杂性');
console.log('  • 提供统一、简洁的 API');
console.log('  • 让开发者专注于业务逻辑');
console.log('');

console.log('🤝 团队协作友好：');
console.log('  • Windows 开发者和 macOS 开发者使用同样的命令');
console.log('  • 减少因平台差异导致的问题');
console.log('  • CI/CD 流程更加稳定');
console.log('');

console.log('📦 开箱即用：');
console.log('  • 一行安装，无需配置');
console.log('  • 零学习成本');
console.log('  • 完全透明的实现');
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('8️⃣  当前环境信息');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('操作系统：', process.platform);
console.log('  • darwin  → macOS');
console.log('  • win32   → Windows');
console.log('  • linux   → Linux');
console.log('');

console.log('Node.js 版本：', process.version);
console.log('');

console.log('环境变量示例：');
if (process.env.NODE_ENV) {
  console.log(`  NODE_ENV = ${process.env.NODE_ENV}`);
}
if (process.env.PORT) {
  console.log(`  PORT = ${process.env.PORT}`);
}
if (!process.env.NODE_ENV && !process.env.PORT) {
  console.log('  (当前没有设置 NODE_ENV 或 PORT)');
  console.log('  试试: cross-env NODE_ENV=production PORT=8080 node 09_cross_env_explained.js');
}
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('9️⃣  测试命令');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('在你的终端中尝试：');
console.log('');
console.log('# 使用 cross-env（推荐，跨平台）');
console.log('cross-env NODE_ENV=production PORT=8080 node 09_cross_env_explained.js');
console.log('');

if (process.platform === 'win32') {
  console.log('# 原生 Windows 语法');
  console.log('set NODE_ENV=production && set PORT=8080 && node 09_cross_env_explained.js');
  console.log('');
  console.log('# PowerShell 语法');
  console.log('$env:NODE_ENV="production"; $env:PORT="8080"; node 09_cross_env_explained.js');
} else {
  console.log('# 原生 Unix 语法（你的系统）');
  console.log('NODE_ENV=production PORT=8080 node 09_cross_env_explained.js');
}
console.log('');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎯 总结');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

console.log('跨平台的含义：');
console.log('  同一段代码可以在不同操作系统上无修改地运行');
console.log('  • Windows (cmd, PowerShell)');
console.log('  • macOS (zsh, bash)');
console.log('  • Linux (bash, sh)');
console.log('');

console.log('cross-env 解决的问题：');
console.log('  • 统一环境变量设置语法');
console.log('  • 消除平台差异');
console.log('  • 提升开发体验');
console.log('');

console.log('何时使用 cross-env：');
console.log('  ✅ npm scripts 中需要设置环境变量');
console.log('  ✅ 团队成员使用不同操作系统');
console.log('  ✅ 需要在 CI/CD 中运行（可能是不同平台）');
console.log('  ✅ 开源项目（用户可能用任何平台）');
console.log('');

console.log('💡 这就是为什么 cross-env 体现了"工程美学"：');
console.log('   优雅地解决了真实世界的复杂问题！');
console.log('');


/**
 * 06_环境变量 (key=value 形式)
 * 
 * 环境变量的传递和获取
 */

console.log('=== 环境变量传递 ===\n');

console.log('=== 传递方式 ===\n');

console.log('1. 命令行直接设置:');
console.log('   Linux/Mac: PORT=3000 NODE_ENV=production node script.js');
console.log('   Windows (CMD): set PORT=3000 && node script.js');
console.log('   Windows (PowerShell): $env:PORT=3000; node script.js');
console.log('');

console.log('2. 使用 cross-env (跨平台):');
console.log('   cross-env PORT=3000 NODE_ENV=production node script.js');
console.log('   需要安装: npm install cross-env');
console.log('');

console.log('3. 使用 .env 文件 (配合 dotenv):');
console.log('   创建 .env 文件，内容如下:');
console.log('     PORT=3000');
console.log('     NODE_ENV=production');
console.log('     API_KEY=your-api-key');
console.log('   在代码中加载: require("dotenv").config()');
console.log('   需要安装: npm install dotenv');
console.log('');

console.log('4. 系统环境变量:');
console.log('   export PORT=3000  (Linux/Mac, 当前会话)');
console.log('   写入 ~/.bashrc 或 ~/.zshrc (永久)');
console.log('');

console.log('=== 当前环境变量 ===\n');

// 常见的环境变量
const commonEnvVars = [
  'NODE_ENV',
  'PORT',
  'HOST',
  'DEBUG',
  'PATH',
  'HOME',
  'USER',
  'SHELL',
  'PWD',
  'API_KEY',
  'DATABASE_URL'
];

console.log('常见环境变量:');
commonEnvVars.forEach(key => {
  if (process.env[key]) {
    // 对敏感信息进行部分隐藏
    let value = process.env[key];
    if (key.includes('KEY') || key.includes('SECRET') || key.includes('PASSWORD')) {
      value = value.slice(0, 4) + '****' + value.slice(-4);
    }
    // 截断过长的值
    if (value.length > 60) {
      value = value.slice(0, 60) + '...';
    }
    console.log(`  ${key}: ${value}`);
  }
});

console.log('\n所有自定义环境变量 (非系统变量):');
Object.keys(process.env)
  .filter(key => !['PATH', 'HOME', 'USER', 'SHELL', 'PWD', 'LANG', 'TERM'].includes(key))
  .filter(key => process.env[key] && process.env[key].length < 100)
  .slice(0, 15)
  .forEach(key => {
    console.log(`  ${key}: ${process.env[key]}`);
  });

console.log('\n=== 获取环境变量的方法 ===\n');

console.log('1. 直接访问:');
console.log('   const port = process.env.PORT;');
console.log('');

console.log('2. 提供默认值:');
console.log('   const port = process.env.PORT || 3000;');
console.log('');

console.log('3. 类型转换:');
console.log('   const port = parseInt(process.env.PORT || "3000", 10);');
console.log('   const debug = process.env.DEBUG === "true";');
console.log('');

console.log('4. 使用解构:');
console.log('   const { PORT, NODE_ENV, API_KEY } = process.env;');
console.log('');

console.log('=== 实际示例 ===\n');

// 获取并使用环境变量
const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  debug: process.env.DEBUG === 'true',
  host: process.env.HOST || 'localhost',
  apiKey: process.env.API_KEY,
  databaseUrl: process.env.DATABASE_URL
};

console.log('应用配置:');
console.log(JSON.stringify(config, null, 2));

console.log('\n=== 环境变量 vs 命令行参数 ===\n');
console.log('环境变量:');
console.log('  ✓ 适合配置信息和敏感数据');
console.log('  ✓ 可以在系统级别设置');
console.log('  ✓ 适合容器化部署');
console.log('  ✓ 可以使用 .env 文件管理');
console.log('');
console.log('命令行参数:');
console.log('  ✓ 适合运行时选项');
console.log('  ✓ 更直观，易于调试');
console.log('  ✓ 适合临时覆盖配置');
console.log('  ✓ 更灵活，支持多种格式');

console.log('\n=== 测试命令示例 ===');
console.log('node 06_env_variables.js');
console.log('PORT=8080 node 06_env_variables.js');
console.log('PORT=8080 NODE_ENV=production node 06_env_variables.js');
console.log('PORT=8080 NODE_ENV=production DEBUG=true node 06_env_variables.js');
console.log('cross-env PORT=8080 NODE_ENV=production node 06_env_variables.js');


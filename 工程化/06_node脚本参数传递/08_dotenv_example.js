/**
 * 08_使用 dotenv 加载环境变量
 * 
 * dotenv 可以从 .env 文件加载环境变量到 process.env
 * 
 * 需要先安装: npm install dotenv
 */

// 在应用最开始加载 dotenv
// require('dotenv').config();

console.log('=== dotenv 环境变量管理 ===\n');

console.log('=== 使用说明 ===\n');

console.log('1. 安装 dotenv:');
console.log('   npm install dotenv');
console.log('');

console.log('2. 创建 .env 文件:');
console.log('   PORT=3000');
console.log('   NODE_ENV=development');
console.log('   API_KEY=your-api-key');
console.log('');

console.log('3. 在代码开头加载:');
console.log('   require("dotenv").config();');
console.log('');

console.log('4. 使用环境变量:');
console.log('   const port = process.env.PORT;');
console.log('');

console.log('=== 高级用法 ===\n');

console.log('1. 指定 .env 文件路径:');
console.log('   require("dotenv").config({ path: "/path/to/.env" });');
console.log('');

console.log('2. 使用多个环境文件:');
console.log('   .env              # 默认配置');
console.log('   .env.local        # 本地覆盖（不提交到 git）');
console.log('   .env.development  # 开发环境');
console.log('   .env.production   # 生产环境');
console.log('');
console.log('   加载顺序示例:');
console.log('   require("dotenv").config({ path: ".env" });');
console.log('   require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });');
console.log('');

console.log('3. 使用 dotenv-expand (支持变量展开):');
console.log('   npm install dotenv-expand');
console.log('   const dotenv = require("dotenv");');
console.log('   const dotenvExpand = require("dotenv-expand");');
console.log('   dotenvExpand.expand(dotenv.config());');
console.log('');
console.log('   .env 文件支持变量引用:');
console.log('   BASE_URL=http://localhost');
console.log('   PORT=3000');
console.log('   API_URL=${BASE_URL}:${PORT}/api');
console.log('');

console.log('4. 使用 dotenv-cli (命令行工具):');
console.log('   npm install dotenv-cli');
console.log('   dotenv -e .env.production node script.js');
console.log('');

console.log('=== 最佳实践 ===\n');

console.log('1. .env 文件不要提交到版本控制:');
console.log('   在 .gitignore 中添加:');
console.log('   .env');
console.log('   .env.local');
console.log('   .env.*.local');
console.log('');

console.log('2. 提供 .env.example 作为模板:');
console.log('   包含所有需要的环境变量名，但值为示例');
console.log('   可以提交到版本控制');
console.log('');

console.log('3. 使用有意义的变量名:');
console.log('   ✓ DATABASE_URL');
console.log('   ✓ API_KEY');
console.log('   ✓ NODE_ENV');
console.log('   ✗ URL');
console.log('   ✗ KEY');
console.log('');

console.log('4. 敏感信息只放在 .env 中:');
console.log('   - API 密钥');
console.log('   - 数据库密码');
console.log('   - 第三方服务凭证');
console.log('');

console.log('5. 为不同环境使用不同的配置:');
console.log('   开发环境: .env.development');
console.log('   测试环境: .env.test');
console.log('   生产环境: .env.production');
console.log('');

console.log('=== 完整示例代码 ===\n');
console.log(`
// app.js
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
    pool: {
      min: parseInt(process.env.DB_POOL_MIN || '2', 10),
      max: parseInt(process.env.DB_POOL_MAX || '10', 10)
    }
  },
  api: {
    key: process.env.API_KEY,
    secret: process.env.API_SECRET,
    baseUrl: process.env.API_BASE_URL || 'http://localhost:3000'
  },
  features: {
    caching: process.env.FEATURE_CACHING === 'true',
    logging: process.env.FEATURE_LOGGING === 'true'
  }
};

// 验证必需的环境变量
const requiredEnvVars = ['DATABASE_URL', 'API_KEY'];
const missingEnvVars = requiredEnvVars.filter(key => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.error('缺少必需的环境变量:', missingEnvVars.join(', '));
  process.exit(1);
}

console.log('配置加载成功:', config);
`);

console.log('\n=== package.json 脚本配置 ===\n');
console.log(`
{
  "scripts": {
    "dev": "node app.js",
    "dev:verbose": "DEBUG=* node app.js",
    "start": "NODE_ENV=production node app.js",
    "start:staging": "dotenv -e .env.staging node app.js",
    "start:prod": "dotenv -e .env.production node app.js"
  }
}
`);

console.log('=== 当前示例 ===\n');
console.log('由于 dotenv 需要安装依赖，本示例不执行实际加载。');
console.log('请参考上面的说明和代码示例进行实际使用。');
console.log('');
console.log('查看 .env.example 文件获取完整的环境变量模板。');


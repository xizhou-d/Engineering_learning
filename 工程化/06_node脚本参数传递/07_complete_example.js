/**
 * 07_完整示例 - 综合使用所有参数传递方式
 * 
 * 这是一个实际应用场景的示例，展示如何综合使用：
 * - 环境变量
 * - 命令行参数
 * - 配置文件
 * - 默认值
 */

const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

console.log('=== 完整示例：综合参数处理 ===\n');

// 1. 解析命令行参数
const args = minimist(process.argv.slice(2), {
  string: ['config', 'env', 'name', 'output'],
  boolean: ['debug', 'verbose', 'help', 'dry-run'],
  alias: {
    h: 'help',
    v: 'verbose',
    d: 'debug',
    c: 'config',
    e: 'env',
    n: 'name',
    o: 'output',
    p: 'port'
  },
  default: {
    env: 'development'
  }
});

// 2. 显示帮助信息
if (args.help) {
  console.log(`
用法: node 07_complete_example.js [选项] [文件...]

选项:
  -h, --help            显示帮助信息
  -v, --verbose         详细输出
  -d, --debug           启用调试模式
  -c, --config <path>   指定配置文件路径
  -e, --env <env>       运行环境 (development|staging|production)
  -n, --name <name>     应用名称
  -p, --port <port>     端口号
  -o, --output <path>   输出路径
  --dry-run             模拟运行，不实际执行

环境变量:
  NODE_ENV              运行环境
  PORT                  端口号
  DEBUG                 调试模式
  CONFIG_FILE           配置文件路径

示例:
  node 07_complete_example.js --help
  node 07_complete_example.js -v -d
  node 07_complete_example.js --config config.json --env production
  PORT=8080 node 07_complete_example.js --name MyApp
  node 07_complete_example.js file1.txt file2.txt --verbose
  npm run example -- --port 5000 --dry-run
  `);
  process.exit(0);
}

// 3. 加载配置文件（如果指定）
let fileConfig = {};
const configPath = args.config || process.env.CONFIG_FILE;
if (configPath) {
  try {
    const fullPath = path.resolve(configPath);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      fileConfig = JSON.parse(content);
      console.log(`✓ 已加载配置文件: ${configPath}`);
    } else {
      console.log(`⚠ 配置文件不存在: ${configPath}`);
    }
  } catch (error) {
    console.error(`✗ 配置文件解析失败: ${error.message}`);
  }
}

// 4. 合并配置（优先级：命令行参数 > 环境变量 > 配置文件 > 默认值）
const config = {
  // 环境配置
  env: args.env || process.env.NODE_ENV || fileConfig.env || 'development',
  
  // 应用配置
  name: args.name || process.env.APP_NAME || fileConfig.name || 'MyApp',
  port: parseInt(args.port || process.env.PORT || fileConfig.port || '3000', 10),
  host: args.host || process.env.HOST || fileConfig.host || 'localhost',
  
  // 输出配置
  output: args.output || process.env.OUTPUT_DIR || fileConfig.output || './dist',
  
  // 调试选项
  debug: args.debug || process.env.DEBUG === 'true' || fileConfig.debug || false,
  verbose: args.verbose || fileConfig.verbose || false,
  dryRun: args['dry-run'] || fileConfig.dryRun || false,
  
  // 位置参数（文件列表）
  files: args._,
  
  // 其他配置
  ...fileConfig
};

console.log('\n=== 最终配置 ===');
console.log(JSON.stringify(config, null, 2));

console.log('\n=== 配置来源分析 ===');

// 分析每个配置项的来源
function getConfigSource(key, cliValue, envValue, fileValue, defaultValue) {
  if (cliValue !== undefined && cliValue !== null) return '命令行参数';
  if (envValue !== undefined && envValue !== null) return '环境变量';
  if (fileValue !== undefined && fileValue !== null) return '配置文件';
  return '默认值';
}

console.log(`env:     ${config.env.padEnd(15)} [${getConfigSource('env', args.env, process.env.NODE_ENV, fileConfig.env, 'development')}]`);
console.log(`name:    ${config.name.padEnd(15)} [${getConfigSource('name', args.name, process.env.APP_NAME, fileConfig.name, 'MyApp')}]`);
console.log(`port:    ${String(config.port).padEnd(15)} [${getConfigSource('port', args.port, process.env.PORT, fileConfig.port, '3000')}]`);
console.log(`host:    ${config.host.padEnd(15)} [${getConfigSource('host', args.host, process.env.HOST, fileConfig.host, 'localhost')}]`);
console.log(`output:  ${config.output.padEnd(15)} [${getConfigSource('output', args.output, process.env.OUTPUT_DIR, fileConfig.output, './dist')}]`);
console.log(`debug:   ${String(config.debug).padEnd(15)} [${getConfigSource('debug', args.debug, process.env.DEBUG, fileConfig.debug, false)}]`);
console.log(`verbose: ${String(config.verbose).padEnd(15)} [${getConfigSource('verbose', args.verbose, null, fileConfig.verbose, false)}]`);

console.log('\n=== 执行模拟 ===');

if (config.dryRun) {
  console.log('🔍 模拟运行模式 (Dry Run)');
}

if (config.debug) {
  console.log('🐛 调试模式已启用');
  console.log('   原始命令行参数:', process.argv.slice(2));
  console.log('   解析后的参数:', args);
}

if (config.verbose) {
  console.log('📝 详细输出模式');
}

console.log(`\n🚀 启动应用: ${config.name}`);
console.log(`   环境: ${config.env}`);
console.log(`   监听: ${config.host}:${config.port}`);
console.log(`   输出: ${config.output}`);

if (config.files.length > 0) {
  console.log(`\n📁 要处理的文件 (${config.files.length}个):`);
  config.files.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
}

console.log('\n=== 配置优先级说明 ===');
console.log('优先级从高到低：');
console.log('1. 命令行参数 (--xxx, -x)');
console.log('2. 环境变量 (process.env.XXX)');
console.log('3. 配置文件 (--config 指定的 JSON 文件)');
console.log('4. 默认值 (代码中硬编码的默认值)');

console.log('\n=== 测试命令示例 ===');
console.log('# 基础使用');
console.log('node 07_complete_example.js --help');
console.log('node 07_complete_example.js -v -d');
console.log('');
console.log('# 指定配置');
console.log('node 07_complete_example.js --name MyApp --port 8080 --env production');
console.log('node 07_complete_example.js -n MyApp -p 8080 -e production');
console.log('');
console.log('# 使用环境变量');
console.log('PORT=8080 NODE_ENV=production node 07_complete_example.js');
console.log('DEBUG=true node 07_complete_example.js --verbose');
console.log('');
console.log('# 使用配置文件');
console.log('node 07_complete_example.js --config example-config.json');
console.log('node 07_complete_example.js -c example-config.json --port 9000');
console.log('');
console.log('# 处理文件');
console.log('node 07_complete_example.js file1.txt file2.txt file3.txt');
console.log('node 07_complete_example.js *.txt --verbose');
console.log('');
console.log('# 组合使用');
console.log('PORT=8080 node 07_complete_example.js -dv -n MyApp file1.txt file2.txt');
console.log('node 07_complete_example.js --config config.json --port 9000 --dry-run');
console.log('');
console.log('# npm scripts');
console.log('npm run example -- --port 5000 --verbose');


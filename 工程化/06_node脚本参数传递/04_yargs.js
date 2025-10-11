/**
 * 04_使用 yargs 库解析参数
 * 
 * yargs 是一个功能丰富的命令行参数解析库
 * 提供了链式 API、参数验证、自动生成帮助信息等功能
 * 
 * 需要先安装: npm install yargs
 */

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

console.log('=== yargs 参数解析 ===\n');

// 配置 yargs
const argv = yargs(hideBin(process.argv))
  .usage('用法: $0 [options] [files...]')
  .example('$0 -n Alice', '指定名称为 Alice')
  .example('$0 -p 8080 --verbose', '指定端口并启用详细输出')
  .example('$0 file1.txt file2.txt', '处理多个文件')
  
  // 定义选项
  .option('debug', {
    alias: 'd',
    type: 'boolean',
    description: '启用调试模式'
  })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: '详细输出'
  })
  .option('name', {
    alias: 'n',
    type: 'string',
    description: '指定名称',
    demandOption: false  // 可选参数
  })
  .option('port', {
    alias: 'p',
    type: 'number',
    description: '指定端口号',
    default: 3000
  })
  .option('env', {
    alias: 'e',
    type: 'string',
    description: '运行环境',
    choices: ['development', 'staging', 'production'],  // 限定选择
    default: 'development'
  })
  .option('config', {
    alias: 'c',
    type: 'string',
    description: '配置文件路径',
    normalize: true  // 规范化路径
  })
  .option('output', {
    alias: 'o',
    type: 'string',
    description: '输出目录',
    coerce: (arg) => {
      // 自定义转换函数
      return arg ? arg.replace(/\/$/, '') : arg;
    }
  })
  .option('tags', {
    alias: 't',
    type: 'array',
    description: '标签列表'
  })
  
  // 参数分组
  .group(['debug', 'verbose'], '调试选项:')
  .group(['name', 'env'], '应用选项:')
  .group(['port', 'config', 'output'], '配置选项:')
  
  // 参数验证
  .check((argv) => {
    if (argv.port < 0 || argv.port > 65535) {
      throw new Error('端口号必须在 0-65535 之间');
    }
    return true;
  })
  
  // 帮助和版本信息
  .help('h')
  .alias('h', 'help')
  .version('1.0.0')
  .alias('V', 'version')
  
  // 严格模式：不允许未定义的选项
  .strict()
  
  // 当没有参数时显示帮助
  .demandCommand(0, 0, '', '错误: 未知的命令')
  
  // 解析参数
  .parse();

console.log('=== 解析结果 ===');
console.log(JSON.stringify(argv, null, 2));

console.log('\n---\n');

// 实际使用示例
console.log('=== 实际使用示例 ===');

if (argv.debug) {
  console.log('✓ 调试模式已启用');
}

if (argv.verbose) {
  console.log('✓ 详细模式已启用');
}

if (argv.name) {
  console.log(`✓ 名称: ${argv.name}`);
}

console.log(`✓ 端口: ${argv.port}`);
console.log(`✓ 环境: ${argv.env}`);

if (argv.config) {
  console.log(`✓ 配置文件: ${argv.config}`);
}

if (argv.output) {
  console.log(`✓ 输出目录: ${argv.output}`);
}

if (argv.tags && argv.tags.length > 0) {
  console.log(`✓ 标签: ${argv.tags.join(', ')}`);
}

// 获取位置参数（非选项参数）
const files = argv._;
if (files.length > 0) {
  console.log(`✓ 要处理的文件 (${files.length}个):`, files);
}

console.log('\n=== yargs 特性 ===');
console.log('1. 自动生成帮助信息和使用示例');
console.log('2. 支持参数类型验证 (string, number, boolean, array)');
console.log('3. 支持参数选择限制 (choices)');
console.log('4. 支持默认值');
console.log('5. 支持参数别名');
console.log('6. 支持参数分组显示');
console.log('7. 支持自定义验证函数');
console.log('8. 支持自定义转换函数 (coerce)');
console.log('9. 支持子命令');
console.log('10. 严格模式，捕获未知参数');

console.log('\n=== 测试命令示例 ===');
console.log('node 04_yargs.js --help');
console.log('node 04_yargs.js --version');
console.log('node 04_yargs.js -d -v');
console.log('node 04_yargs.js --debug --verbose');
console.log('node 04_yargs.js --name Alice --port 8080');
console.log('node 04_yargs.js -n Bob -p 9000');
console.log('node 04_yargs.js --env production');
console.log('node 04_yargs.js --env staging -p 5000');
console.log('node 04_yargs.js -t tag1 -t tag2 -t tag3');
console.log('node 04_yargs.js --tags tag1 tag2 tag3');
console.log('node 04_yargs.js file1.txt file2.txt file3.txt');
console.log('node 04_yargs.js -dv -n John -e production file1.txt');
console.log('node 04_yargs.js --output=/path/to/dir/ --config config.json');


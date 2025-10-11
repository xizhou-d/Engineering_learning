/**
 * 03_使用 commander 库解析参数
 * 
 * commander 是一个功能强大的命令行接口库
 * 提供了声明式的 API，自动生成帮助信息
 * 
 * 需要先安装: npm install commander
 */

const { program } = require('commander');

console.log('=== commander 参数解析 ===\n');

// 配置程序信息
program
  .name('my-script')
  .description('Node.js 参数传递示例程序')
  .version('1.0.0');

// 定义选项
program
  .option('-d, --debug', '启用调试模式')
  .option('-v, --verbose', '详细输出')
  .option('-n, --name <name>', '指定名称')
  .option('-p, --port <port>', '指定端口号', '3000')  // 带默认值
  .option('-c, --config <path>', '配置文件路径')
  .option('--no-color', '禁用颜色输出')  // 否定选项
  .option('-e, --env <env>', '环境', 'development')
  .option('-r, --repeat <times>', '重复次数', parseInt)  // 类型转换
  .option('--extra [value]', '可选值参数');  // 可选参数

// 定义位置参数
program
  .argument('[files...]', '要处理的文件');

// 自定义帮助信息
program.addHelpText('after', `

示例:
  $ node 03_commander.js --help
  $ node 03_commander.js -d -v
  $ node 03_commander.js --name=Alice --port 8080
  $ node 03_commander.js -n Bob file1.txt file2.txt
  $ node 03_commander.js --repeat 5 --env production
`);

// 解析参数
program.parse(process.argv);

// 获取选项和参数
const options = program.opts();
const files = program.args;

console.log('=== 解析结果 ===');
console.log('\n选项 (options):');
console.log(JSON.stringify(options, null, 2));

console.log('\n位置参数 (files):');
console.log(files);

console.log('\n---\n');

// 实际使用示例
console.log('=== 实际使用示例 ===');

if (options.debug) {
  console.log('✓ 调试模式已启用');
}

if (options.verbose) {
  console.log('✓ 详细模式已启用');
}

if (options.name) {
  console.log(`✓ 名称: ${options.name}`);
}

console.log(`✓ 端口: ${options.port}`);
console.log(`✓ 环境: ${options.env}`);

if (options.color !== undefined) {
  console.log(`✓ 颜色输出: ${options.color ? '启用' : '禁用'}`);
}

if (options.config) {
  console.log(`✓ 配置文件: ${options.config}`);
}

if (options.repeat) {
  console.log(`✓ 重复次数: ${options.repeat} (类型: ${typeof options.repeat})`);
}

if (options.extra !== undefined) {
  console.log(`✓ 额外参数: ${options.extra || '(无值)'}`);
}

if (files.length > 0) {
  console.log(`✓ 要处理的文件 (${files.length}个):`, files);
}

console.log('\n=== commander 特性 ===');
console.log('1. 自动生成 --help 和 --version');
console.log('2. 支持短选项和长选项 (-v, --verbose)');
console.log('3. 支持必需参数 <param> 和可选参数 [param]');
console.log('4. 支持默认值');
console.log('5. 支持类型转换函数');
console.log('6. 支持否定选项 (--no-xxx)');
console.log('7. 自动验证参数');
console.log('8. 支持子命令');

console.log('\n=== 测试命令示例 ===');
console.log('node 03_commander.js --help');
console.log('node 03_commander.js --version');
console.log('node 03_commander.js -d -v');
console.log('node 03_commander.js --debug --verbose');
console.log('node 03_commander.js --name Alice --port 8080');
console.log('node 03_commander.js -n Bob -p 9000');
console.log('node 03_commander.js --repeat 5 --env production');
console.log('node 03_commander.js --no-color');
console.log('node 03_commander.js file1.txt file2.txt file3.txt');
console.log('node 03_commander.js -dv -n John -p 5000 input.txt output.txt');
console.log('node 03_commander.js --extra');
console.log('node 03_commander.js --extra=value');


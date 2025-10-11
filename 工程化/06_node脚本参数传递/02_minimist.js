/**
 * 02_使用 minimist 库解析参数
 * 
 * minimist 是一个轻量级的参数解析库
 * 自动处理 -x, --xxx, --xxx=yyy 等各种格式
 * 
 * 需要先安装: npm install minimist
 */

const minimist = require('minimist');

console.log('=== minimist 参数解析 ===\n');

// 基础用法
const args = minimist(process.argv.slice(2));

console.log('原始参数:', process.argv.slice(2));
console.log('\n解析结果:');
console.log(JSON.stringify(args, null, 2));

console.log('\n---\n');

// 高级用法：配置选项
const advancedArgs = minimist(process.argv.slice(2), {
  // 指定哪些参数是字符串（不转换为数字或布尔值）
  string: ['name', 'message'],
  
  // 指定哪些参数是布尔值
  boolean: ['verbose', 'debug', 'help'],
  
  // 参数别名
  alias: {
    h: 'help',
    v: 'verbose',
    d: 'debug',
    n: 'name',
    p: 'port'
  },
  
  // 默认值
  default: {
    port: 3000,
    verbose: false
  },
  
  // -- 之后的参数放入 '_' 数组
  '--': true
});

console.log('=== 高级配置解析结果 ===');
console.log(JSON.stringify(advancedArgs, null, 2));

console.log('\n---\n');

// 实际使用示例
console.log('=== 实际使用示例 ===');

if (advancedArgs.help) {
  console.log('帮助信息：');
  console.log('  -h, --help      显示帮助');
  console.log('  -v, --verbose   详细输出');
  console.log('  -d, --debug     调试模式');
  console.log('  -n, --name      指定名称');
  console.log('  -p, --port      指定端口 (默认: 3000)');
}

if (advancedArgs.verbose) {
  console.log('✓ 详细模式已启用');
}

if (advancedArgs.debug) {
  console.log('✓ 调试模式已启用');
}

if (advancedArgs.name) {
  console.log(`✓ 名称: ${advancedArgs.name}`);
}

console.log(`✓ 端口: ${advancedArgs.port}`);

if (advancedArgs._.length > 0) {
  console.log('✓ 位置参数:', advancedArgs._);
}

if (advancedArgs['--']) {
  console.log('✓ -- 之后的参数:', advancedArgs['--']);
}

console.log('\n=== 参数解析规则 ===');
console.log('1. -x         -> { x: true }');
console.log('2. -x 3       -> { x: 3 }');
console.log('3. -xyz       -> { x: true, y: true, z: true }');
console.log('4. --name     -> { name: true }');
console.log('5. --name=val -> { name: "val" }');
console.log('6. --name val -> { name: "val" }');
console.log('7. arg1 arg2  -> { _: ["arg1", "arg2"] }');
console.log('8. -- -file   -> { "--": ["-file"] }');

console.log('\n=== 测试命令示例 ===');
console.log('node 02_minimist.js');
console.log('node 02_minimist.js -h');
console.log('node 02_minimist.js --help');
console.log('node 02_minimist.js -v -d');
console.log('node 02_minimist.js --verbose --debug');
console.log('node 02_minimist.js --name=Alice --port=8080');
console.log('node 02_minimist.js -n Bob -p 9000');
console.log('node 02_minimist.js file1.txt file2.txt --verbose');
console.log('node 02_minimist.js -vd -n John -p 5000 input.txt output.txt');
console.log('node 02_minimist.js --config -- -special-file.txt');


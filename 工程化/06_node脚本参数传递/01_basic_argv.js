/**
 * 01_基础参数获取 - 使用原生 process.argv
 * 
 * process.argv 是一个数组，包含启动Node.js进程时的命令行参数
 * - argv[0]: Node.js可执行文件的路径
 * - argv[1]: 正在执行的JavaScript文件的路径
 * - argv[2+]: 实际传递的参数
 */

console.log('=== 原生 process.argv 参数解析 ===\n');

// 1. 打印完整的 argv 数组
console.log('完整的 process.argv:');
process.argv.forEach((arg, index) => {
  console.log(`  [${index}]: ${arg}`);
});

console.log('\n---\n');

// 2. 提取实际参数（去掉前两个）
const args = process.argv.slice(2);
console.log('实际传递的参数:', args);
console.log('参数数量:', args.length);

console.log('\n---\n');

// 3. 手动解析不同类型的参数
const parsedArgs = {
  flags: [],           // 布尔标志: -a, --verbose
  options: {},         // 键值对: --name=value, --port 3000
  positional: [],      // 位置参数: 不带横线的参数
};

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  // 双横线参数 --xxx 或 --xxx=yyy
  if (arg.startsWith('--')) {
    const withoutDashes = arg.slice(2);
    
    // 包含等号: --key=value
    if (withoutDashes.includes('=')) {
      const [key, value] = withoutDashes.split('=');
      parsedArgs.options[key] = value;
      console.log(`解析到双横线键值对(等号): --${key}=${value}`);
    }
    // 下一个参数不是选项: --key value
    else if (i + 1 < args.length && !args[i + 1].startsWith('-')) {
      parsedArgs.options[withoutDashes] = args[i + 1];
      console.log(`解析到双横线键值对(空格): --${withoutDashes} ${args[i + 1]}`);
      i++; // 跳过下一个参数
    }
    // 布尔标志: --flag
    else {
      parsedArgs.flags.push(withoutDashes);
      console.log(`解析到双横线标志: --${withoutDashes}`);
    }
  }
  // 单横线参数 -x 或 -xyz (可能是组合标志)
  else if (arg.startsWith('-') && arg.length > 1 && arg !== '--') {
    const withoutDash = arg.slice(1);
    
    // 如果包含等号: -k=v
    if (withoutDash.includes('=')) {
      const [key, value] = withoutDash.split('=');
      parsedArgs.options[key] = value;
      console.log(`解析到单横线键值对: -${key}=${value}`);
    }
    // 下一个参数不是选项: -k value
    else if (withoutDash.length === 1 && i + 1 < args.length && !args[i + 1].startsWith('-')) {
      parsedArgs.options[withoutDash] = args[i + 1];
      console.log(`解析到单横线键值对: -${withoutDash} ${args[i + 1]}`);
      i++; // 跳过下一个参数
    }
    // 组合标志: -abc 表示 -a -b -c
    else {
      const flags = withoutDash.split('');
      flags.forEach(flag => parsedArgs.flags.push(flag));
      console.log(`解析到单横线标志(可能组合): -${withoutDash} -> ${flags.join(', ')}`);
    }
  }
  // -- 分隔符：后面的所有参数都作为位置参数
  else if (arg === '--') {
    console.log('遇到 -- 分隔符，后面的参数都作为位置参数');
    parsedArgs.positional.push(...args.slice(i + 1));
    break;
  }
  // 位置参数（不带横线）
  else {
    parsedArgs.positional.push(arg);
    console.log(`解析到位置参数: ${arg}`);
  }
}

console.log('\n---\n');

// 4. 显示解析结果
console.log('=== 解析结果 ===');
console.log('标志 (flags):', parsedArgs.flags);
console.log('选项 (options):', parsedArgs.options);
console.log('位置参数 (positional):', parsedArgs.positional);

console.log('\n---\n');

// 5. 处理环境变量（通过 key=value 形式传递）
console.log('=== 环境变量 ===');
console.log('当前进程的部分环境变量:');
if (process.env.PORT) console.log('  PORT:', process.env.PORT);
if (process.env.NODE_ENV) console.log('  NODE_ENV:', process.env.NODE_ENV);
if (process.env.DEBUG) console.log('  DEBUG:', process.env.DEBUG);

console.log('\n=== 测试命令示例 ===');
console.log('node 01_basic_argv.js');
console.log('node 01_basic_argv.js arg1 arg2 arg3');
console.log('node 01_basic_argv.js -a -b -c');
console.log('node 01_basic_argv.js -abc');
console.log('node 01_basic_argv.js --verbose --debug');
console.log('node 01_basic_argv.js --name=John --age=25');
console.log('node 01_basic_argv.js --name John --age 25');
console.log('node 01_basic_argv.js -n John -a 25');
console.log('node 01_basic_argv.js input.txt output.txt --verbose');
console.log('node 01_basic_argv.js --config -- -file-with-dash.txt');
console.log('PORT=3000 NODE_ENV=production node 01_basic_argv.js');
console.log('node 01_basic_argv.js -abc --verbose --name=John pos1 pos2 -x val');


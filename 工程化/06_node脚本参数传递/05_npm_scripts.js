/**
 * 05_npm scripts 中传递参数
 * 
 * 在 package.json 的 scripts 中定义的脚本如何传递参数
 */

console.log('=== npm scripts 参数传递 ===\n');

console.log('完整的 process.argv:');
process.argv.forEach((arg, index) => {
  console.log(`  [${index}]: ${arg}`);
});

console.log('\n实际参数:', process.argv.slice(2));

console.log('\n=== npm scripts 参数传递规则 ===\n');

console.log('1. 直接在 scripts 中硬编码参数:');
console.log('   "scripts": {');
console.log('     "dev": "node script.js --env development --port 3000"');
console.log('   }');
console.log('   执行: npm run dev');
console.log('');

console.log('2. 使用 -- 分隔符传递额外参数:');
console.log('   "scripts": {');
console.log('     "start": "node script.js"');
console.log('   }');
console.log('   执行: npm run start -- --port 8080 --verbose');
console.log('   实际执行: node script.js --port 8080 --verbose');
console.log('');

console.log('3. 使用环境变量:');
console.log('   "scripts": {');
console.log('     "prod": "NODE_ENV=production PORT=8080 node script.js"');
console.log('   }');
console.log('   执行: npm run prod');
console.log('');

console.log('4. 使用 cross-env 跨平台设置环境变量:');
console.log('   "scripts": {');
console.log('     "prod": "cross-env NODE_ENV=production node script.js"');
console.log('   }');
console.log('   执行: npm run prod');
console.log('');

console.log('5. 组合使用:');
console.log('   "scripts": {');
console.log('     "start": "NODE_ENV=development node script.js --port 3000"');
console.log('   }');
console.log('   执行: npm run start -- --verbose -n Alice');
console.log('   实际执行: NODE_ENV=development node script.js --port 3000 --verbose -n Alice');
console.log('');

console.log('6. 使用 npm 内置变量:');
console.log('   可以通过 process.env.npm_package_xxx 访问 package.json 的内容');
console.log('   可以通过 process.env.npm_config_xxx 访问 npm config');
console.log('');

console.log('=== 查看 npm 相关环境变量 ===\n');
Object.keys(process.env)
  .filter(key => key.startsWith('npm_'))
  .sort()
  .slice(0, 10)  // 只显示前10个
  .forEach(key => {
    console.log(`${key}: ${process.env[key]}`);
  });

console.log('\n=== 测试命令示例 ===');
console.log('npm run test:args');
console.log('npm run test:args -- --name Alice --port 8080');
console.log('npm run test:args -- -d -v file1.txt file2.txt');
console.log('npm run test:env');
console.log('npm run test:combined -- --extra-flag');


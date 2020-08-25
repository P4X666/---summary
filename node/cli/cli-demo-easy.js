/**
 *  runcode : node cli-demo-easy app -i
 *  cli-demo : 我们的脚本文件
 *  app : 要生成的项目的名称
 *  -i : 参数，表示要同时产生index.html文件
 */

const fs = require('fs');

// 获取用户要生成的项目名称，process.argv[2]
/**
*   process 对象是一个全局变量，它提供有关当前 Node.js 进程的信息并对其进行控制。 
*   作为一个全局变量，它始终可供 Node.js 应用程序使用，无需使用 require()
*   process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。
*   第一个元素是 process.execPath，也就是node.exe所在的路径。 第二个元素将是正在执行的 JavaScript 文件的路径。 
*   其余元素将是任何其他命令行参数。如本次执行命令为node cli-demo app，那么app就是我们的第三个参数，通过process.argv[2]获取
*/
 
console.log(process.argv);

let appName = process.argv[2]||'app';

// 根据项目名称生成指定的目录
let appRoot = __dirname + '/' + appName;
// console.log(__dirname)
// 通过检查文件系统来测试给定的路径是否存在，如果路径存在，则返回 true，否则返回 false。
if ( fs.existsSync(appRoot) ) {
    console.log('项目已经存在了，请勿重复创建！');
    // process.exit() 方法以退出状态 code 指示 Node.js 同步地终止进程。 
    // 如果省略 code，则使用成功代码 0 或 process.exitCode 的值（如果已设置）退出
    // 调用 process.exit() 将强制进程尽快退出，即使还有尚未完全完成的异步操作，包括对 process.stdout 和 process.stderr 的 I/O 操作。 
    process.exit();
}

// 开始生成文件
fs.mkdirSync( appRoot );
fs.mkdirSync( appRoot + '/images' );
fs.mkdirSync( appRoot + '/css' );
fs.mkdirSync( appRoot + '/js' );

// 判断是否存在 -i 的选项
if ( process.argv.includes('-i') ) {
    fs.writeFileSync(appRoot + '/index.html', `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>App</title>
</head>
<body>
    <h1>App</h1>
</body>
</html>
    `);
}

console.log('项目创建完成！');
// 在命令行中写东西,使用readline.cursorTo这个方法，可以改变命令行上的光标的位置。
// readline.cursorTo(process.stdout, 0, 0);是移动到第1列第1行上，
// readline.cursorTo(process.stdout, 0, 1);是移动到第1列第2行上。
// process.stdout.cursorTo(0,0);
// process.stdout.write('() aaaa \r\n');
// process.stdout.write('(+) bbbb \r\n');
// process.stdout.write('() cccc \r\n');
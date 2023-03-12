
const path = require('path');
const fs = require('fs');
const vm = require('vm');

const wrapper = [
    '(function (exports, require, module, __dirname, __filename) {\r\n',
    '\r\n})'
];
class Module {
    id: string;
    exports: {};
    static extensions = {
        // 如果文件是js 的话 后期用这个函数来处理 
        '.js': function (module: Module) {
            // 1) 读取     
            let script = fs.readFileSync(module.id, 'utf8');
            // 2) 增加函数 还是一个字符串     
            let content = wrapper[0] + script + wrapper[1];
            // 3) 让这个字符串函数执行 (node里api)     
            let fn = vm.runInThisContext(content); // 这里就会返回一个js函数     
            let __dirname = path.dirname(module.id);
            // 让函数执行     
            fn.call(module.exports, module.exports, req, module, __dirname, module.id)
        },
        '.json': function (module: Module) {
            let script = fs.readFileSync(module.id, 'utf8');
            module.exports = JSON.parse(script)
        }
    };
    // 将一个相对路径 转化成绝对路径
    static _resolveFilename = function (id: string) {
        // 将相对路径转化成绝对路径     
        let absPath = path.resolve(id);
        //  先判断文件是否存在如果存在     
        if (fs.existsSync(absPath)) {
            return absPath;
        }
        // 去尝试添加文件后缀 .js .json      
        let extenisons = Object.keys(Module.extensions);
        for (let i = 0; i < extenisons.length; i++) {
            let ext = extenisons[i];
            // 判断路径是否存在         
            let currentPath = absPath + ext; // 获取拼接后的路径         
            let exits = fs.existsSync(currentPath); // 判断是否存在         
            if (exits) {
                return currentPath
            }
        }
        throw new Error('文件不存在')
    };
    static _cache: Record<string, Module>={};
    constructor(id: string) {
        this.id = id; // 当前模块的id名     
        this.exports = {}; // 默认是空对象 导出的结果 
    }

}

// 模块独立 相互没关系 
function tryModuleLoad(module: Module) {
    // 尝试加载模块    
    let ext = path.extname(module.id) as keyof typeof Module.extensions;
    Module.extensions[ext](module)
}

function req(id: string) {
    console.log(id)
    // 通过相对路径获取绝对路径     
    let filename = Module._resolveFilename(id);
    let cache = Module._cache[filename];
    if (cache) { // 如果有缓存直接将模块的结果返回         
        return cache.exports
    }
    let module = new Module(filename);
    // 创建了一个模块     
    Module._cache[filename] = module;
    // 加载相关模块 （就是给这个模块的exports赋值）     
    tryModuleLoad(module); // module.exports = {}     
    return module.exports;
}

let str = req('./a');
console.log(str);
let json_test = req('./b')
console.log(json_test);

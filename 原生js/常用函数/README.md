# js中的那些常用的函数  

### 目录
* [缓存函数](#缓存函数)  
* [函数内的数组合并](#函数内的数组合并)

###  [缓存函数](#目录)
```js  
// 使用缓存函数去处理大量的重复计算，比如递归调用斐波拉切数列  
let count = 0  
let fibonaci = (n)=>{  
    count++  
    return n<2 ? n : fibonaci(n-1) + fibonaci(n-2)  
}  
// 使用普通递归  
for(let i=0;i<=10;i++){  
    fibonaci(i)  
}  
console.log(count)  
// 使用缓存函数  

var memoize = function(func,hasher){  
    var memoize = function(key){  
        var cache = memoize.cache  
        var address = '' + (hasher ? hasher.apply(this,arguments):key)  
        if(!cache[address]){  
            cache[address] = func.apply(this,arguments)  
        }  
        return cache[address]  
    }  
    memoize.cache = {}  
    return memoize  
}  
fibonaci = memoize(fibonaci)  
for(let i=0;i<=10;i++){  
    fibonaci(i)  
}  
console.log(count)  
```  
### [函数内的数组合并](#目录)
```js
// 要在函数内合并一个类似的数组，难点在于arguments是个不定值，可能是一个也可能是多个
function test1(){
    var args=[3]
    Array.prototype.push.apply(args, arguments);
    console.log(args)
}
// 同样可以使用es6的解构赋值
function test2(){
    var args=[3]
    console.log([...args,...arguments])
}
test1(5,9,6,7)  //[3,5,9,6,7]
test2(5,9,6,7)  //[3,5,9,6,7]
```
使用场景可见[underscore](../../工具及类库/undesocre代码组织结构/underscore.js)
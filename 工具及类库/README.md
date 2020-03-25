# 工具函数及类库  
#### 跟着 underscore 学工具函数的编写  

## 关于架构  
*   首先它的最外层是一个立即执行函数，防止变量污染，然后通过传值进行绑定  
*   其次它支持两种方式的引入，面向对象及函数式编程  
源码  
```js  
(  
    function(root){  
        let _=function(){  
            if(!(this instanceof _)){  
                return new _()  
            }  
        }  
        _.prototype  
    }  
)(this)  

```  

调用  

```js  

<script src="underscore"></script>  

<script>  
    // 通过下划线直接调用  
    
    _.unique()  
    // _()实例化一个对象  
    _().unique()  
</script>  

```  
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

let memoize = function(func,hasher){
    let memoize = function(key){
        let cache = memoize.cache
        let address = '' + (hasher ? hasher.apply(this,arguments):key)
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
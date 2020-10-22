# js中的那些常用的函数  

### 目录
* [缓存函数](#缓存函数)  
* [函数内的数组合并](#函数内的数组合并)
* [计算页面渲染的详细时间](#计算页面渲染的详细时间)
* [构建一个函数库](#构建一个函数库)

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

### [计算页面渲染的详细时间](#目录)

```js
window.addEventListener("load", function() {
    setTimeout(function() {
        var e = window.performance;
        if (e) {
            var t = e.getEntriesByType("navigation")[0]
                , r = 0;
            t || (r = (t = e.timing).navigationStart);
            var n = [{
                key: "Redirect",
                desc: "\u7f51\u9875\u91cd\u5b9a\u5411\u7684\u8017\u65f6",
                value: t.redirectEnd - t.redirectStart
            }, {
                key: "AppCache",
                desc: "\u68c0\u67e5\u672c\u5730\u7f13\u5b58\u7684\u8017\u65f6",
                value: t.domainLookupStart - t.fetchStart
            }, {
                key: "DNS",
                desc: "DNS\u67e5\u8be2\u7684\u8017\u65f6",
                value: t.domainLookupEnd - t.domainLookupStart
            }, {
                key: "TCP",
                desc: "TCP\u8fde\u63a5\u7684\u8017\u65f6",
                value: t.connectEnd - t.connectStart
            }, {
                key: "Waiting(TTFB)",
                desc: "\u4ece\u5ba2\u6237\u7aef\u53d1\u8d77\u8bf7\u6c42\u5230\u63a5\u6536\u5230\u54cd\u5e94\u7684\u65f6\u95f4 / Time To First Byte",
                value: t.responseStart - t.requestStart
            }, {
                key: "Content Download",
                desc: "\u4e0b\u8f7d\u670d\u52a1\u7aef\u8fd4\u56de\u6570\u636e\u7684\u65f6\u95f4",
                value: t.responseEnd - t.responseStart
            }, {
                key: "HTTP Total Time",
                desc: "http\u8bf7\u6c42\u603b\u8017\u65f6",
                value: t.responseEnd - t.requestStart
            }, {
                key: "DOMContentLoaded",
                desc: "dom\u52a0\u8f7d\u5b8c\u6210\u7684\u65f6\u95f4",
                value: t.domContentLoadedEventEnd - r
            }, {
                key: "Loaded",
                desc: "\u9875\u9762load\u7684\u603b\u8017\u65f6",
                value: t.loadEventEnd - r
            }];
            if (Math.random() > .75) {
                var s = window.location
                    , i = s.href
                    , c = s.pathname
                    , u = navigator.userAgent
                    , d = i.split("?")[0];
                o.a.post("https://tr.jianshu.com/fe/1/mon/atf", {
                    app: "shakespeare-performance",
                    url: d,
                    ua: u,
                    path: c,
                    stats_ttfb: t.responseStart - t.requestStart,
                    stats_domLoaded: t.domContentLoadedEventEnd - r,
                    stats_loaded: t.loadEventEnd - r
                }).then(a.a).catch(a.a)
            }
            console && console.log && console.log(n)
        }
    }, 0)
});
```

### 构建一个函数库
从0构建一个函数库，首先我们要写一个IIFE(又称自执行函数)，
```js
    (function (root) {
        // console.log(root)
        root.Codebase1 = function (x) {
            this.uid = x
        }

        function test(params) {
            console.log(params)
        }
        Codebase1.prototype.output = function (params) {
            test(params)
            this.uid += params
            console.log(this.uid)
            return this
        }
        Codebase1.prototype.$test = function (params) {
            console.log(params)
        }
        return Codebase1
    })(window)
    let test1 = new Codebase1(1)
    console.log(test1);


        (Codebase2=function (x) {
                this.uid = x

                function test(params) {
                    console.log(params)
                }
                this.output = function (params) {
                    test(params)
                    this.uid += params
                    console.log(this.uid)
                    return this
                }
                this.$test = function (params) {
                    console.log(params)
                }
                return this
        })()
    let test2 = new Codebase2(1)
    console.log(test2)
```
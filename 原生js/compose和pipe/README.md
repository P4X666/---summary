# compose 和 pipe 函数  

## compose 函数  

### 定义  
将需要嵌套的函数平铺  
嵌套函数指的是，一个函数的返回值将作为另一个函数的的参数  

### 作用  
实现函数式编程中的point free，使我们专注于转换而不是数据  

##### 注：point free 不需要所要处理的值，只合成运算过程  

### 具体例子如下  
```js
var add = n => n + 3;  
var multiple = n => n * 2;  
var minus = n => n - 1;  

var compose = (...funcs) => {  
    if (funcs.length === 0) {  
        return arg => arg;  
    }  
    return funcs.reduce(  
        (a, b) => {  
            console.log(a,b,"传入的函数")  
          return (...args) => {  
            //   因为箭头函数没有自己的arguments，所以用扩展运算符来获取函数的不定数量的参数  
            //   在此处的作用为表示将传入的参数，及前一次运算后的数组通过扩展运算符扩展为原始值  
            console.log(args,"表示传入的值或上次运算后的值")  
            console.log(a(b(...args)),"本次运算后的值")  
            //   之所以调整a与b就可以达到将传入的函数进行正向或反向执行  
            //   是因为在进入函数之后，三个参数变成了两个，如此例，先执行a参数，就是先执行add函数  
            //   multiple, minus函数变成了第二个参数，然后第二个参数里面又分为了两个函数，同样先执行a函数，即multiple函数  
            return  a(b(...args))  
            }  
        }  
    );  
}  
console.log(  
    compose(  
        add,  
        multiple,  
        minus  
    )(10)  
);  
```
## pipe 函数  
其实compose函数和pipe函数作用相同，只是运算方向不同  
compose函数的运算方向为从右向左，pipe函数为从左向右  
如：  
```js
var pipe = (...funcs) => {  
    if (funcs.length === 0) {  
        return arg => arg;  
    }  
    return funcs.reduce(  
        (a, b) => (...args) => b(a(...args))  
    );  
}  
```
结合高阶函数中的[reduce函数](../高阶函数/README.md)更佳  

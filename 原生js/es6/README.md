# 关于es6的一些新的认识及思考  

## 目录  
* [Symbol](#Symbol)  
* [函数的扩展](#函数的扩展)  
* [Object.defineProperty和Proxy的异同](#Object.defineProperty和Proxy的异同)  
* * *
## [Symbol](#目录)  
关于Symbol，[官方的说法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)  
简单的说就是，每个从Symbol()返回的symbol值都是唯一的。一个symbol值能作为对象属性的标识符；这是该数据类型仅有的目的  
当然，知道是一码事，能不能理解，在工作中能不能把它用上就是另外一回事了  
初学的时候就只停留在下面的地步  
```js  
    /*   
        Symbol是ES6新增的基本数据类型  
        值是由 Symbol 函数调用产生的  
    */  
    var s1 = Symbol();  
    var s2 = Symbol();  
    console.log( typeof s1 );  
    console.log(s1, s2);  
    console.log( s1 == s2 );  
```  
工作开发中从来没有用过，也不知道怎么去使用  
后来随着阅历的增加，终于发现了它的用途，我们知道js中万物皆对象，甚至有人说理解了对象就理解了js，但是又因为对象键值  
的可变性，导致js不能去做过于复杂的事情，因为它很容易就会被修改  

比如说我希望一个对象有着一个永远不会被篡改的值  
这就涉及到Symbol的使用，属性私有化 - 数据保护  
```js  

        // 我希望一个Person的品质在出生以后就能够被确定，并一直保存到死  
        function Person(name, character) {  
            this.name = name;  
            this.character = character;  
        }  

        var p1 = new Person('亚索', '飘逸');  
        console.log(p1.character);  
        // 这时如果有人拿到这个值，并将其修改为其他属性  
        p1.character='憨憨'  
        console.log(p1.character);  
        // 很明显这个属性被修改了  
```  
        这个时候我们就想，既然对象很容易被修改，那么我们使用函数  
        不让你拿到这个对象不就好了  
```js  
        var Person = (function() {  
            var _character = '';  
            function P(name, character) {  
                this.name = name;   
                _character = character;  
            }  
            P.prototype.getcharacter = function() {  
                return _character;  
            }  
            return P;  
        })();  
        var p1 = new Person('盖伦', '勇敢');  
        console.log(p1);  
        console.log(p1.getcharacter());  
        // 天真，难道忘了刚刚说的，在js里面万物皆对象？  
        var character=function(){  
            return '怂'  
        }  
        p1.__proto__.getcharacter=character  
        console.log(p1);  
```  
在js中，既可以通过prototype，给一个函数赋予一个方法，同样可以通过__proto__去更改这个方法。  
那么，这个时候Symbol就应运而生了  
```js  
        var Person = (function() {  

            let _character = Symbol('character');  

            function P(name, character) {  
                this.name = name;  
                this[_character] = character;  
            }  

            P.prototype.say = function() {  
                console.log(this[_character]);  
            }  

            return P;  

        })();  

        var p1 = new Person('德莱文', '暴力');  
        console.log(p1);  
        console.log(p1[Symbol('character')])  
        // 这个时候我们用同样的方法再试一次  
        p1.__proto__.say=function(){  
            return '怂'  
        }  
        console.log(p1.say())  
        //  单单看结果的话，貌似我们也修改成功了  
        // 但是，当我们去看p1的时候，我们发现p1并没有被改变，只是它里面的方法被改变了，  
        //  其本身所返回的值却没有被改变  
        console.log(p1)  
```  
这样的话，我们在引用第三方库的时候，我们就可以通过类似于Symbol这样的数据结构来避免覆盖之类的问题  
因为每个Symbol值都是独一无二的  
* * *
## [函数的扩展](#目录)  
个人觉得这个比起上一个，这个在日常开发中更常见，也更实用，比如在日常开发中我们总是能够见到类似于下面的代码  
```js  
function getdata1(obj){  
    if(obj){  
        // do something  
    }else{  
        var obj={  
            a:1,  
            b:2  
        }  
    }  
    console.log(obj)  
}  
```  
在一些数据的传递的时候，总是需要判断是否有参数，如果没有，就要设置一个默认的参数，防止出错，但是有了这个扩展之后，  
我们就可以这么写  
```js  
    // 这么写的话让人更容易明白你想获取什么样的参数，让人一眼明了  
    function getdata2(obj = {x: 1, y: 2}) {  
        console.log(obj);  
    }  
```  
又比如，我们有时候会把一些经常用到的函数给集成在一个工具库里，比如要将一些不定量的参数放到第一个参数数组里  
```js  
    function arrayPush() {  
        // 利用arguments关键字去操作  
        var arr = arguments[0];  
        for (var i=1; i<arguments.length; i++) {  
            arr.push( arguments[i] );  
        }  
        return arr  
    }  
    // 很明显，这样并不能很直观的表达出这个函数所需要的的参数，以及它的用途  
    // 你可能会说加上注释不就可以了，很遗憾，大部分时候不是我们不想写，是公司不让，  
    // 这样的话，过一段时间，就连你自己都不知道这个工具函数所存在的意义是啥了  
    function arrayPush1(arr, ...data) {  //从第二个参数开始，后面的数据全部赋值给data这个参数  
            // for (var i=0; i<data.length; i++) {  
            //     arr.push( data[i] );  
            // }  
            // return arr  
            // 同样可以用es6的结构赋值来达到如上效果  
            return [...arr,...data]  
    }  
    var arr1 = [1,2,3];  
    var arr2=arrayPush1(arr1, 4, 5, 6);  
    console.log(arr2);  
```  
* * *
## [Object.defineProperty和Proxy的异同](#目录)  
什么是definePorperty?  
MDN上面的解释是：  
```  
Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象  
```  
它一共有以下这些属性名及默认值  
```
属性名         默认值  
value          underfined  
writable       false  
enumerable     false     
configurable   false  
get            underfined  
set            underfined  
```


很明显，defineProperty是用来定义对象属性的，但是可以借助它属性里的get和set可以实现响应式

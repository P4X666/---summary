# 关于es6的一些新的认识及思考  

### Symbol  

## Symbol  
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
        console.log(p1.getcharacter()); 
```  

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

        var p1 = new Person('莫涛', '男');
        console.log(p1);
        console.log(p1[Symbol('character')])
```  

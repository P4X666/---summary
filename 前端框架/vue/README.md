# vue  

## 目录  
* [自定义指令](#自定义指令)
* [响应式原理的实现](#响应式原理的实现)  

## [自定义指令](#目录)
探索vue的使用
+ 1 自定义指令是什么
+ 2 什么时候去创建
+ 3 如何创建一个自定义指令
#### 指令是什么
Vue中内置了很多的指令，如v-model、v-show、v-if等，但是有时候这些指令并不能满足我们，或者说我们想为元素附加一些特别的功能，
这时候，我们就需要用到vue中一个很强大的功能了—自定义指令。
自定义指令解决的问题或者说使用场景是对普通 DOM 元素进行底层操作，所以我们不能盲目的滥用自定义指令，
具体可见[官方文档](https://cn.vuejs.org/v2/guide/custom-directive.html)
#### 什么时候去创建
为了保证methods方法只有纯粹的数据逻辑（和DOM解耦，易于单元测试），不去处理DOM相关的操作
当我们的methods中存在操作DOM/BOM的逻辑的时候，就该思考是否可以抽象成一个自定义指令
#### 如何创建一个自定义指令
首先，我们需要认识一下自定义指令所提供的几个钩子函数
```js
// 注册一个全局自定义指令 `v-demo`
Vue.directive('demo', {
//   一个指令定义对象可以提供如下几个钩子函数 (均为可选)：
  bind:function(el,binding,vnode){},
// bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  inserted:function(el,binding,vnode){},
// inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  update:function(el,binding,vnode,oldVnode){},
// update：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。
  componentUpdated:function(el,binding,vnode,oldVnode){},
// componentUpdated：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  unbind:function(el,binding,vnode){},
// unbind：只调用一次，指令与元素解绑时调用。
})
```
然后，我们需要了解一下这些钩子中所传的参数

+ el：指令所绑定的元素，可以用来直接操作 DOM。
+ binding：一个对象，包含以下 property：
+ name：指令名，不包括 v- 前缀。
+ value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
+ oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
+ expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
+ arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
+ modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
+ vnode：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
+ oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

<em> 除了 el 之外，其它参数都应该是只读的，切勿进行修改。如果需要在钩子之间共享数据，建议通过element元素的 dataset 来进行。</em>

最后，我们来实现一个自定义的指令
需求
注册
调用




## [响应式原理的实现](#目录)  
在说响应式原理之前，首先要说一下响应式的由来  
当页面上的一个数据的变化会引起其他一部分数据的变化，用代码表示  
```js  
var x,y  
var f = (n)=>{n++}  
x = 1  
y = f(x)  
console.log(y)  
x = 2  
y = f(x)  
console.log(y)  
```  
在前端逻辑不复杂的时候，这么处理是勉强可以接受的，但是随着前端的发展，  
前端越来越复杂，那么上面那种处理方式就会使代码十分的臃肿，并且使逻辑变得混乱  
于是，在这种情形下，响应式便应运而生了  
```js  
var x,y  
var f = (n)=>{console.log(n++)}  
var OnXChange = function(){}  
// 我们需要去定义OnXChange函数，使其能够实现当x改变的时候，y也会随之改变  
// 而不是通过代码去一步步的调用  
OnXChange(()=>{  
    y=f(x)  
    console.log(y)  
})  
x=1  
x=2  
```  
如果要实现上面的效果，我们就需要用到Object.defineProperty这个方法  
而这个方法又不能作用在引用类型上，那么我们需要对输入值x进行一个改造  
```js  
var ref = (initValue)=>{  
    let value = initValue  
    return Object.defineProperty({},'value',{  
        get(){  
            return value  
        }  
        set(newValue){  
            value = newValue  
        }  
    })  
}  
// 然后输入初始值  
x = ref(1)  
// 既然x已经被转为引用类型了，那么后面的调用的方式也要随之改变  
OnXChange(()=>{  
    y=f(x.value)  
    console.log(y)  
})  
x.value = 2  
x.value = 3  
```  
当然了，我们还需要在set函数中调用一下才能走通这一步  
完整代码如下  
```js  
var x,y  
var f = (n)=>{console.log(n++)}  

var active  
var OnXChange = function(func){  
    active= func  
    // 如果要使数据在第一次定义的时候就出发该函数，那么就需要在此函数中调用一次  
    active()  
    active=null  
}  

var ref = (initValue)=>{  
    let value = initValue  
    return Object.defineProperty({},'value',{  
        get(){  
            return value  
        },  
        set(newValue){  
            value = newValue  
            active()  
        }  
    })  
}  
x = ref(1)  
OnXChange(()=>{  
    y=f(x.value)  
    console.log(y)  
})  
x.value = 2  
x.value = 3    
```  
这个时候我们已经初步实现了一个响应式，但是在实际生产中不可能说每次都是输入的x值，也有可能是z，k或是其他值，  
那么我们就需要对上面那个流程进行一个扩展，在此基础上增加一个依赖收集  
```js  
class DepCollection{  
    deps = new Set()  
    depend(){  
        if(active)){  
            this.deps.add(active)  
        }  
    }  
    notify(){  
        this.deps.forEach(dep=>dep())  
    }  
}  
// 然后去修改一下ref函数，使其能够完整实现监听功能  
var ref = (initValue)=>{  
    var value = initValue  
    var deps=new DepCollection()  
    return Object.defineProperty({},'value',{   
        get(){  
            deps.depend()  
            return value  
        },  
        set(newValue){  
            value = newValue  
            deps.notify()  
        }  
    })  
}  

```  
那么完整代码如下  
```js  
let x;  
let y;  
let f = n => n++;  

let active;  

let onXChanged = function(cb) {  
  active = cb;  
  active();  
  active = null;  
};  

class DepCollection {  
  constructor() {  
    this.deps = new Set();  
  }  
  depend() {  
    if (active) {  
      this.deps.add(active);  
    }  
  }  
  notify() {  
    this.deps.forEach(dep => dep());  
  }  
}  

let ref = initValue => {  
  let value = initValue;  
  let dep = new DepCollection();  

  return Object.defineProperty({}, "value", {  
    get() {  
      dep.depend();  
      return value;  
    },  
    set(newValue) {  
      value = newValue;  
      dep.notify();  
    }  
  });  
};  

x = ref(1); // 2  

onXChanged(() => {  
  y=f(x.value)  
  console.log(y)  
});  

x.value = 2; // 3  
x.value = 3; // 4  
```  
上面是vue2所使用的方法，借助Object.defineProperty去实现响应式，而vue3则是采用了proxy,如果要进行更改，则只需要对Object.defineProperty部分更改即可  
```js  
let ref = initValue => {  
  let value = initValue;  
  let dep = new DepCollection();  

//   return Object.defineProperty({}, "value", {  
//     get() {  
//       dep.depend();  
//       return value;  
//     },  
//     set(newValue) {  
//       value = newValue;  
//       dep.notify();  
//     }  
//   });  
    return new Proxy({value:initValue}, {  
        get(target, key, value) {  
          dep.depend();  
          return target[key];  
        },  
      
        set(target, key, value) {  
          target[key]=value;  
          dep.notify();  
        }  
      })  
};  
```  
vue的响应式原理的流程如下：  
![Alt](../../book/2020-04-19-220756.png)  
其中onXChanged的作用就相当于watcher，负责监听数据，每当数据发生改动时，做出相应的变化。而DepCollection通过depend收集watcher，通过notify触发watcher更新  
而ref就相当于Data数据处理部分，将输入的数据改造成可以被监听的数据，通过getter将数据传给DepCollection进行依赖收集，通过setter触发DepCollection的notify函数，
最终实现了一个完整的响应式  
这时候我们就可以拿着代码去测试了，然后我们发现一个很奇怪的事情
```js
let x,j,k;  
let y;  
let f = n => n++;  

let active;  

let Watcher = function(cb) {  
  active = cb;  
  active();  
  active = null;  
};  

class DepCollection {  
  constructor() {  
    this.deps = new Set();  
  }  
  depend() {  
    if (active) {  
      this.deps.add(active);  
    }  
  }  
  notify() {  
    this.deps.forEach(dep => dep());  
  }  
}  

let ref = initValue => {  
  let value = initValue;  
  let dep = new DepCollection();  

  return Object.defineProperty({}, "value", {  
    get() {  
      dep.depend();  
      return value;  
    },  
    set(newValue) {  
      value = newValue;  
      dep.notify();  
    }  
  });  
};  

x = ref(1);   
j = ref(2);
k = ref(3);
Watcher(() => {    
  console.log(f(x.value),f(j.value),f(k.value))  
});  

x.value = 5;   
j.value = 5; 
k.value = 5; 
```
在打印之后，我们得到了这样的数据
```js
1 2 3//初始化时所返回的值
5 2 3//x改变时所导致的更新
5 5 3//j改变时所导致的更新
5 5 5//k改变时所导致的更新
```
我们发现每一次数据的更新都会导致所有的数据的变化，如果是DOM渲染，那么必定会影响性能
这时我们需要一个函数批量完成上面的操作，这个函数需要具备在所有同步任务完成后在执行的特性，
我们发现promise刚好具备这个特性，详情请看[宏任务与微任务](../js执行/README.md)
因为要批量更新，那么我们就从DepCollection类中的notify开始，将其立即完成的任务改成异步微任务
```js
let tasks=[]
let nextTick=(cb)=>{
  return Promise.resolve().then(cb)
}
let runtask=()=>{
  let task
  while(tasks.length>0){
    task=tasks.shift()
    task && task()
  }
}
let collectTask=(cb)=>{
    if(!tasks.includes(cb)){
      tasks.push(cb)
      nextTick(runtask)
    } 
}
class DepCollection {  
  constructor() {  
    this.deps = new Set();  
  }  
  depend() {  
    if (active) {  
      this.deps.add(active);  
    }  
  }  
  notify() {  
    this.deps.forEach(dep => collectTask(dep));  
  }  
} 
```


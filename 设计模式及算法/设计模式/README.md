### 前言
最近在面试的时候，基本上都会提一嘴设计模式，但是被问到的面试者大多数人总感觉在背题，没有从项目的角度，或者说从实际的项目开发中来说这个事情，借此机会用大白话总结一下日常接触到的那些设计模式

### 设计模式的定义

通常的定义如下：  
设计模式是软件开发人员在软件开发过程中面临的一般问题的解决方案。这些解决方案是众多软件开发人员经过相当长的一段时间的试验和错误总结出来的  
换句话说就是，先有代码，然后大佬们针对特定场景总结出通用解决方案，而这些通用的解决方案就是设计模式

### 日常工作中经常遇到的设计模式

#### 单例模式
*全局唯一的对象或方法*  
使用场景：项目中公用的类通过export default将实例导出来实现全局唯一
```js
class CommonClass{
...code
}
export default new CommonClass()
```

#### 工厂模式
*批量创建相同类型的对象*  
使用场景：
react ReactDOM.createRoot React.createElement

react中最常见的`jsx`，本质就是`React.createElement`，而`React.createElement`就是工厂模式的实现，它可以批量创建 React 元素，在老版的官网中甚至都直接说出这个就是工厂模式  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a037f2c196d4f78962d0b814c05fa2a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1937&h=1127&s=196911&e=png&b=fefefe)

[老版地址](https://zh-hans.react.dev/reference/react/createFactory)


#### 代理模式
*为其他对象提供一种代理以控制对这个对象的访问*
使用场景 vue2中的`Object.defineProperty`，vue3中的`proxy`，微信小程序中使用的较多 数据代理  惰性取值等
如：在小程序中通常都会有埋点操作，因为是通用方法，所以在app.js中引入，但是此时在初始化app的时候，是拿不到app，那么我们就可以借助代理模式来实现惰性取值
```js
const app = {};
Object.defineProperty(app, 'sensors', {
    get() {
        return getApp().sensors;
    }
})
```
又或者图片的懒加载
```js
var myImage = (function(){
    var imgNode = document.createElement('img');
    document.body.appendChild(imgNode);
    return {
        setSrc: function(src) {
            imgNode.src = src;
        }
    }
})();

var proxyImage = (function(){
    var img = new Image;
    img.onload = function() {
        myImage.setSrc(this.src);
    }
    return {
        setSrc: function(src) {
            myImage.setSrc('./preset.png');  // 一般是本地统一的占位图
            img.src = src;
        }
    }
})();

proxyImage.setSrc('./real.png');  // 一般是异步获取的图片链接
```
#### 装饰器模式

*装饰器模式允许向一个现有的对象添加新的功能，同时又不改变其结构。*  
主打的就是在外面加一层  
项目中的组件复用，基本都是利用的这种模式     
再比如在执行函数执行之前，添加其他的执行逻辑

```js
/** 包裹执行函数，在执行函数执行之前，添加执行逻辑 */
const funcWrapper = (cb) => (...params) => {
    // 在执行函数之前，执行其他逻辑
    return cb(...params);
}
```

#### 策略模式
*策略模式就是根据不同参数可以命中不同的策略*
简单的说就是每个key都对应一个策略（场景），这样我们很容易想到对象的写法  
使用场景 订单状态不同，处理方式不同

```js
const ORDERSTRATEGIE={
    orderStatus1: ()=>{
        console.log(`当订单状态为${orderStatus1}时的处理逻辑`)
    },
    orderStatus2: ()=>{
        console.log(`当订单状态为${orderStatus2}时的处理逻辑`)
    },
    orderStatus3: ()=>{
        console.log(`当订单状态为${orderStatus3}时的处理逻辑`)
    },
    ...code
}
```
#### 适配器模式
常见于跨端中，主打的就是适配    
使用场景 pc端需要h5端填写信息确认，下拉组件需要在pc和h5有着不同的表现  
和策略模式的区别在于，适配器模式需要依赖现有的代码，如上述场景中pc项目的代码不用动，在此基础上添加适配h5的代码即可  
```js
functino Select(props){
    if(isH5){
        return <H5Select {...props} />
    }
    // 原有的代码无需改动
    return <PCSelect {...props} />
}
```

#### 迭代器模式
*迭代器模式提供一种方法顺序访问一个聚合对象中的各个元素，而又不暴露其内部的表示*  
这个我们可以依赖es6 中的提供的api `iterator` 即可，毕竟实际开发中确实很少遇到😂

#### 发布订阅模式
*发布-订阅模式其实是一种对象间一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到状态改变*
使用场景如微信小程序的事件触发，vue的EventBus

```js
class Event {
    eventList = [];
    on(cb) {
        this.eventList.push(cb);
    }
    emit() {
        this.eventList.forEach(cb => cb());
    }
    off() {
        this.eventList.length=0
    }
}
```

#### 组合模式

*组合模式将对象组合成树形结构，以表示“部分-整体”的层次结构*  
表单控件是复合模式的一个完美例子。表单的控件要么包含一个单独的组件，要么包含一组组件

以下是`antd`的表单代码
```js
import React from 'react'; 
import { Button, Checkbox, Form, Input } from 'antd'; 

const onFinish = (values) => { console.log('Success:', values); }; 
const onFinishFailed = (errorInfo) => { console.log('Failed:', errorInfo); }; 

const App = () => ( 
<Form 
    initialValues={{ remember: true, }} 
    onFinish={onFinish} 
    onFinishFailed={onFinishFailed} 
    autoComplete="off"
> 
    <Form.Item
        label="Username" 
        name="username" 
        rules={[ { required: true, message: 'Please input your username!', }, ]} 
    > 
        <Input /> 
    </Form.Item> 
    <Form.Item> 
        <Button type="primary" htmlType="submit"> 
        Submit
        </Button> 
    </Form.Item> 
</Form> ); 

```

#### 原型模式

*原型模式允许我们轻松地让对象访问和继承其他对象的属性。*  
由于原型链允许我们访问未直接定义在对象本身上的属性，我们可以避免方法和属性的重复，从而减少使用的内存量  
最常见的是vue2， 在vue的`prototype`上添加项目中公用的方法，变量
```
import axios from 'axios'
...code

Vue.prototype.$http = axios

...code
```

#### 中介者模式

*中介者模式限制对象之间的直接交互， 迫使它们通过一个中介者对象进行合作*

比如各种状态管理库，react的redux，mobx，vue的pinia，组件都是从状态库中获取数据，降低了组件间的耦合度

#### 职责链模式
*职责链模式使多个对象（方法）都有机会处理请求，将这些对象（方法）连成一条链，并沿着这条链传递该请求*

最常见的是dom中的事件冒泡

```html
    <body>
        <div class="out" onclick="clickOut()">
            <div class="middle" onclick="clickMiddle()">
                <div class="inner" onclick="clickInner()"></div>
            </div>
        </div>
        <script>
            function clickOut() {
                console.log("点击了外部元素");
            }
            function clickMiddle() {
                console.log("点击了中间元素");
            }
            function clickInner() {
                console.log("点击了内部元素");
            }
        </script>
    </body>
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d3080e3763a476a8a20391bab0f0827~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=707&h=872&s=37297&e=png&b=fbfafa)
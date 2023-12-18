# js的设计模式  

## 单例模式

### es5及之前

### es6及之后
只需要将实例直接export即是单例

## 观察者模式  

## 享元模式  

基本结构：  
比如：在一百种不同文字的弹窗，每种弹窗的行为相同，但是文字和样式不同，我们没必要新建一百个弹窗对象  

```js  
function Pop(){  

}  
// 保留同样的行为  
Pop.prototype.action=function(){  

}  
Pop.prototype.show=function(){  
    // 显示弹窗  
}  
// 提取出每个弹窗会不同的部分做成一个外部数组  
var popArr=[  
    {text:'this is window1',style:[400,400]},  
    {text:'this is window2',style:[400,200]}  
]  
var poper=new Pop()  
for(var i=0;i<100;i++){  
    poper.show(popArr[i])  
}  
```  
只需一个类，不需要new一百次弹窗  
这个类只保留所有弹窗共有的，每个弹窗不同的部分留作一个公共享元  

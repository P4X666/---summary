# 浅拷贝和深拷贝

## 浅拷贝
```js
/*
拷贝的意思就是将一个对象所有的，复制一份给另一个对象
那么浅拷贝就是复制表层，也就是第一层
*/
let obj1={name:"timo",age:10}
//如果对象只有一层，里面的数据都是基本数据，那么我们直接
//通过for循环或者对象的assign方法即可
let copyObj1={}
copyObj1=Object.assign(copyObj1,obj1)
// 因为基本数据类型的复制都是复制值，所有完全不用担心会出错
obj1.name="Gray"
console.log(copyObj1.name)//"timo"
```
## 深拷贝

上面的比较容易理解，但是大多数情况下我们遇到的
都不是那么容易理解的数据结构，比如对象中通常会嵌套着对象
例如 
```js
let obj2={
    name:"king",
    wife:['大大','二大','三大'],
    run:()=>{
        console.log(this.name+"跑的飞快")
    },
    date:new Date()
}
```
如果这个时候还用上面的浅拷贝是明显行不通的
```js
let test={}
test=Object.assign(test,obj2)
obj2.wife.push("四大")
console.log(test.wife)
```
很明显，浅拷贝只能复制简单的数据类型的值，到了复杂的类型的时候，
它就只能复制其地址了，这个时候就需要我们进行深拷贝了
```js
isobj=(data)=>{
    return data instanceof Object
}
let deepclone=(obj,targetObj)=>{
    for(let key in obj){
      let value=obj[key]
    //   判断值是否为复杂类型
      if(!isobj(value)){
          targetObj[key]=value
      }else{
        //   如果是复杂类型，则声明一个适合此类型的空地址，
        // 此处new了一下这个值的构造函数，就相当于声明了一个空地址
          let targetvalue=new value.constructor
          deepclone(value,targetvalue)
          targetObj[key]=targetvalue
      }  
    }
    
}
```

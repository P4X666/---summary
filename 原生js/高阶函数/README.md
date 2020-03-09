# es5高阶函数

高阶函数是对其他函数进行操作的函数，可以将它们作为参数返回
简单的说，高阶函数本身还是一个函数，只是它可以接收函数作为参数或将函数输出返回

## map/reduce/filter

#### map方法
用途：
+ 对数组进行映射（对原数组中的每一项做某种操作，操作的结果保存在新数组中返回）
+ 不会修改原数组
```js
var arr1=[1,2,3,4]
var arr2=arr1.map(item=>item*2)
console.log(arr2) // [2,4,6,8]
```
#### reduce方法
用途：
累加器
```js
let sum=arr1.reduce((pre,cur)=>{return pre+cur},0)
console.log(sum)
// 第一个参数为回调函数，数组中的每个成员都会执行，第二个参数为初始值非必填，上面的函数也可以写成下面这种
let arr3=arr1.reduce((pre,cur)=>pre+cur)
console.log(arr3)
```
理解此方法有助于理解[compose函数](../compose和pipe/README.md)

#### filter
用途
顾名思义就是过滤的意思
需求：筛选出年龄大于21的成员
```js
var persons=[
    {name:'Peter',age:21},
    {name:'Mark',age:18},
    {name:'Jane',age:31},
]
var newpersons=persons.filter(item=>item.age>21)
console.log(newpersons)
```

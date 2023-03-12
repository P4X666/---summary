/**
 * 缓存函数
 */
// 使用缓存函数去处理大量的重复计算，比如递归调用斐波拉切数列  
let count = 0  
const fibonaci = (n: number): number =>{  
    count++  
    return n<2 ? n : fibonaci(n-1) + fibonaci(n-2)  
}  
// 使用普通递归  
for(let i=0;i<=10;i++){  
    fibonaci(i)  
}  
console.log(count)  
// 使用缓存函数  

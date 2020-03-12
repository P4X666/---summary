# 节流和防抖  

## 节流  
```js  
/*  
underscore中的的写法  
*/  
let throttle=function(func, wait, options) {  
    var timeout, context, args, result;  
    var previous = 0;  
    if (!options) options = {};  

    var later = function() {  
      previous = options.leading === false ? 0 : nowtime();  
      timeout = null;  
      result = func.apply(context, args);  
      if (!timeout) context = args = null;  
    };  

    var throttled = function() {  
      var now = nowtime();  
      if (!previous && options.leading === false) previous = now;  
      var remaining = wait - (now - previous);  
      context = this;  
      args = arguments;  
      if (remaining <= 0 || remaining > wait) {  
        if (timeout) {  
          clearTimeout(timeout);  
          timeout = null;  
        }  
        previous = now;  
        result = func.apply(context, args);  
        if (!timeout) context = args = null;  
      } else if (!timeout && options.trailing !== false) {  
        timeout = setTimeout(later, remaining);  
      }  
      return result;  
    };  

    throttled.cancel = function() {  
      clearTimeout(timeout);  
      previous = 0;  
      timeout = context = args = null;  
    };  

    return throttled;  
  };  
/*  
按照自己的理解去将underscore中的  
节流函数改造为es6的写法  
*/  
let throttle=(func, wait)=> {  
    
    let timeout, result;  
    let previous = 0;  

    let later = ()=> {  
        previous=nowtime()  
        result=func()  
        timeout = null;  
    };  

    let throttled = ()=> {  
        let now = nowtime();  
        if (!previous)previous = nowtime();  
        let remaining = wait - (now - previous);  

        if (!timeout) {  
            timeout = setTimeout(later, remaining);  
        }  
        return result;  
    };  
    return throttled;  
};  
/*  
大佬的理解，通过开关去控制  
*/  
let throttle = (fn, delay) => {  
    let flag = true;  
    return function (...args) {  
        //如果一个定时器不走完，那么下个定时器就永远无法开始  
        if (!flag) return;  
        flag = false;  
        setTimeout(() => {  
            fn(...args);  
            flag = true;  
        }, delay)  
    }  
}  
```  

## 防抖  
```js  
// underscore 源码
function(func, wait, immediate) {  
var timeout, result;  

var later = function(context, args) {  
    timeout = null;  
    if (args) result = func.apply(context, args);  
};  

var debounced = restArguments(function(args) {  
    if (timeout) clearTimeout(timeout);  
    if (immediate) {  
    var callNow = !timeout;  
    timeout = setTimeout(later, wait);  
    if (callNow) result = func.apply(this, args);  
    } else {  
    timeout = _.delay(later, wait, this, args);  
    }  

    return result;  
});  

debounced.cancel = function() {  
    clearTimeout(timeout);  
    timeout = null;  
};  

return debounced;  
};  
/*  
大佬的理解，通过开关去控制  
*/ 
let deBounce = (fn, delay) => {  
    let timer = null;  
    return function (...args) {  
        //从第二次开始，每次点击都会将  
        //定时器重置  
        if (timer) {  
            clearTimeout(timer);  
        }  

        timer = setTimeout(()=> {  
            fn(...args);  
        }, delay)  
    }  
}  
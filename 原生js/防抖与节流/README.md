```js
var throttle=function(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;
    if (!options) options = {};

    var later = function () {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) context = args = null;
    };

    var throttled = function () {
        var now = _.now();//10
        if (!previous && options.leading === false) previous = now;//10
        var remaining = wait - (now - previous);//5-(10-10)
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

    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = null;
    };

    return throttled;
};



var throttle=function(func, wait) {
    var timeout, result;
    var previous = 0;

    var later = ()=> {
        previous=Date.now
        result=func()
        timeout = null;
    };

    var throttled = ()=> {
        var now = Date.now;
        if (!previous)previous = now;
        var remaining = wait - (now - previous);

        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            result=func()
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
    return throttled;
};
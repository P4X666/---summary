// 第一步


// (function(root){
// 	//构造函数      
// 	let _ = function(obj) { //数据源
// 		// 实例化 _
// 		if (!(this instanceof _)) {
// 			return new _(obj);
// 		}
// 		this.wrap = obj;
// 	}

// 	//[1,2,3,,4,5,5,6,7,8,4,4,5]   数组去重 返回结果  去重之后的数组
// 	_.unique = function(array, callback) {
// 		let result = [];
// 		for (let i = 0; i < array.length; i++) {
// 			// callback为迭代器函数，数组中的每个值都会执行，比如数组中有字符串
// 			// 但是字符串不区分大小写，只保留小写，那么只需要传入一个判断是否为字符串
// 			// ，如果是，则将字符串小写的方法即可
// 			let target = callback ? callback(array[i]) : array[i];
// 			if (result.indexOf(target) === -1) {
// 				result.push(target)
// 			}
// 		}
// 		return result;
// 	}

// 	_.each = function(array, callback) {
// 		for (let i = 0; i < array.length; i++) {
// 			callback.call(array, array[i]);
// 		}
// 	}
// 	_.functions = function(obj) {
// 		let result = [];
// 		for (let key in obj) {
// 			result.push(key);
// 		}
// 		return result;
// 	}
// 		//搭架子
// 	_.mixin = function(obj) {
// 		_.each(_.functions(obj), function(key) {
// 			let func = obj[key];
// 			//unique
// 			_.prototype[key] = function() {
// 				let args = [this.wrap];
// 				// arguments是一个类数组，表示函数里传的所有参数
// 				// 数组合并，相当于结构赋值操作,详情可见常用函数中的函数内的数组合并
// 				Array.prototype.push.apply(args, arguments);
// 				return func.apply(this, args); //[数据源， 迭代器函数]
// 			}
// 		});
// 	}
//  _.mixin(_);//执行后即可满足第二种方式的调用
// }
// )()



// 第二步



(function(root) {
	//构造函数      
	let _ = function(obj) { //数据源
		if (!(this instanceof _)) {
			return new _(obj);
		}

		this.wrap = obj;
	}

	_.map = function(arg1, arg2, arg3) {
		//相同的
		console.log(1)
	}

	//开启链式调用
	_.chain = function(obj) { //数据源
		let instance = _(obj); //特殊的实例对象
		instance._chain = true; //特殊的属性     凭证
		return instance;
	}
// 判断是否启用了链式调用，如果启用则返回一个对象，如果没有，则直接返回值
	let result = function(instance, obj) {
          if(instance._chain){
			 instance.wrap =  obj;
			 return instance;
		  }
		  return obj;
	}
   
    //args  上一道工序处理之后的结果
	_.max = function(args) {
		args.push("max","long");
		return args;
	}

	//[1,2,3,,4,5,5,6,7,8,4,4,5]   数组去重 返回结果  去重之后的数组
	_.unique = function(array, callback) {
		let result = [];
		let i = 0;
		for (; i < array.length; i++) {
			let target = callback ? callback(array[i]) : array[i];
			if (result.indexOf(target) === -1) {
				result.push(target)
			}
		}
		return result;
	}

	_.each = function(array, callback) {
		let i = 0;
		for (; i < array.length; i++) {
			callback.call(array, array[i]);
		}
	}

	_.functions = function(obj) {
		let result = [];
		for (let key in obj) {
			result.push(key);
		}
		return result;
	}
	// 结束链式调用并返回结果
	_.prototype.value = function(){
		console.log(this.wrap);
		return this.wrap;
	}

	//1: 找到 _ 静态属性 [map, unique, ....]     2: 遍历数组   _.prototype[item]     item?map:unique
	//搭架子
	_.mixin = function(obj) {
		_.each(_.functions(obj), function(key) {
			let func = obj[key];
			//unique
			_.prototype[key] = function() {
				let args = [this.wrap];
				//数组合并
				Array.prototype.push.apply(args, arguments);

				//this 判断是否需要链式调用   this._chain === true
				//func.apply(this, args)    数据进过某个工序处理之后的结果
				return result(this, func.apply(this, args)); //[数据源， 迭代器函数]
			}
		});
	}

	_.mixin(_);
	root._ = _;
})(this)

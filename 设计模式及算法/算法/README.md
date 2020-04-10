# 算法部分  
看了大佬的一番讲解，感觉对leecode有了不一样的感觉，毕竟早就想刷leecode，  
但是一看上面一千多道题，每个还都不简单，想针对性的练，但是又不知道从哪一个先开始，  
链接如下  
[@Ikaruga https://leetcode-cn.com/circle/article/g2kEJt/](https://leetcode-cn.com/circle/article/g2kEJt/)  
从此前端菜鸟也开始新的旅程了  
两数之和


第一次提交，先选了个最简单的  两数之和  

给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。  
你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。  
示例:  
```js  
给定 nums = [2, 7, 11, 15], target = 9  

因为 nums[0] + nums[1] = 2 + 7 = 9  
所以返回 [0, 1]  
```  
```js  
var twoSum = function(nums, target) {  
    // 注释部分为第一次提交  
    // var len=nums.length  
    // var targetArr=[]  
    // for(var i=0;i<len;i++){  
    //     for(var j=i+1;j<len+1;j++){  
    //         if(nums[i]+nums[j]===target){  
    //             targetArr.push(i,j)  
    //         }  
    //     }  
    // }  
    // 上一种方式因为使用了两个for循环，耗时更久
    var len=nums.length  
    var res=0  
    var under=0  
    for(var i=0;i<len;i++){  
        res=target-nums[i]  
        under=nums.indexOf(res)  
        if(under!==i && under!==-1){  
            return [i,under]  
        }  
    }  
    return targetArr  
};  
```  
第一次提交结果如下  
![alt 第一次结果](../../book/QQ图片20200331234058.png)  
后来优化之后  
![alt 第一次结果](../../book/QQ图片20200331234020.png)  



npm install --save  hexo-renderer-scss hexo-generator-feed hexo-generator-sitemap hexo-browsersync hexo-generator-archive


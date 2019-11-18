# 面试---summary
关于面试中所暴露出来的不足，用以警醒和进步<br>
-------------------------------------第一2019-10-09------------------------------------<br>
今天一共面试了三家公司，其中两家被重锤<br>
一个是关于技术深度的<br>
另一个是关于人事正常流程的<br>
# 首先说一下技术深度的，公司名为华XXX<br>
一共有三个问题，感觉自己回答的有些模糊，自我感觉应该是给他留下了我仅仅只是一个angular熟手而已<br>
第一个问题 关于函数式编程，简要的谈谈你的看法<br>
        就我目前的水平，我尽量按照自己的理解去说，如有不足之处，还请指正！<br>
个人理解有以下三点：<br>
             第一，函数式编程没有副作用，就是对已声明的变量没有影响，比如：<br>
                 常用的编程思维是     var x=1；<br>
                                      function test(y){<br>
                                             x=x+y;<br>
                                      }<br>
                                      console.log(x)//此时显示的数据与初始的数据是不同的<br>
                  而函数式编程是不会对声明的那个变量造成影响的<br>
                  例如                var a=1;<br>
                                      function testone(b){<br>
                                           return a+b<br>
                                      }<br>
                                     console.log(a)<br>
                   因为这个函数只负责输出一个值，而不参与赋值相关的东西，所以无论怎么变化，初始声明的值始终不会发生改变<br>
                   这也突出了函数式编程的有点，不会对外部条件进行修改<br>
              第二，将函数进行组合嵌套，实现管道流，实现每次输入相同的数值时，都会返回相同的结果<br>
                   例如：function add(x){<br>
                                      return ++x<br>
                                  }<br>
                                  function square(x){<br>
                                      return x*x<br>
                                  }<br>
                                  function compose(f,g){<br>
                                      return function(x){<br>
                                            return g(f(x))<br>
                                  }<br>
                                  }<br>
                                  var addThenSquare=compose(add,square)<br>
                 这样的话，每次调用addThenSquare函数时，它都会返回一个值，同样的值，同样的结果，实现了将函数变为一个管道工具<br>
              第三，关于函数柯里化，对此我不怎么懂，甚至说联想不到相关的场景，一般的解释为：<br>
               函数柯里化指把接受多个参数的多参函数转换成每次只接受一个参数的单参函数，并且返回可以接受余下参数的新函数，<br>
               最大的特点是延迟执行，增加了函数的适用性。<br>
               例如： 常用的函数为   function add(x,y){<br>
                                         return x+y<br>
                                     }<br>
                                    add(1.2)<br>
               而柯里化后为：        function add(x){<br>
                                        return function(y){<br>
                                        return x+y<br>
                                        }<br>
                                    }<br>
                                    var added=add(1)<br>
                                     added(2)<br>
               感觉柯里化之后，反而更加的麻烦了，这就是我不懂的地方，还请大佬指点<br>
 第二个问题：简要的谈一谈map的使用<br>
              10.09未解决<br>
 第三个问题：vue和angular的不同点简要的谈一谈自己的看法<br>
           1 代码结构上，angular的更加清晰明了，有规范，而vue更加的随意<br>
           2 angular更加的容易维护，而vue的维护成本更高<br>
           3 
               
 # 接下来是第二家
 这一家是一家主打室内装修的公司，名为月XX，主要提出的问题都是关于职业素养相关的东西，感觉主要的冲突点为我想展示效果以及<br>
 其中所包含的技术相关，而对方只是想知道我的职业素养和职场沟通相关的东西<br>
 一连串的问题把我问迷糊了，比如自我介绍，自己觉得这两年的成长以及失败的地方，对自己的评价（用一个以及三个关键词总结）<br>
 同事对自己的评价（用一个以及三个关键词总结）<br>

#最后一家面试成功，其中有一个是关于算法相关的题
求一百万以内的任意两位数之间的水仙花数
例子如下：1^3+5^3+3^3=153,那么153就是一个水仙花数
前两天在松山湖和龙岗两边跑，深刻觉得身体才是革命的本钱，以后还是多锻炼身体
好了废话不多说，先说一下我当时的写法
isFlower(){
var a,b
var arr=[]
for( var i = a;i < b;i ++ ){
    var bit = parseInt( i % 10 );
    var decade = parseInt( ( i / 10 ) % 10 );
    var hundreds = parseInt( i / 100 );
    if( Math.pow(bit,3) + Math.pow(decade,3) + Math.pow(hundreds,3) == 100 * hundreds+10 * decade + bit ){
        console.log(i)
        arr.push(i)
    };
};
console.log(arr.length)
}
然后求出一共有几个水仙花数，但是这个只能求出1000以内的
到时候搬家完毕之后再进行解决
最有印象的是讲一下for，for in,for of和foreach的区别，这个留着下次说（先把房子找好）


关于数组去重
https://www.cnblogs.com/wisewrong/p/9642264.html

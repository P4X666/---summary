# 工具函数及类库  
#### 跟着 underscore 学工具函数的编写  

## 关于架构  
*   首先它的最外层是一个立即执行函数，防止变量污染，然后通过传值进行绑定  
*   其次它支持两种方式的调用  
第一种 直接调用underscore对象上的静态方法  
如  _.unique()  
第二种通过实例化一个对象，然后调用此对象上的方法  
如 _().unique()  
详情见：  
[html调用](./undesocre代码组织结构/demo.html)  
[underscore_demo](./undesocre代码组织结构/underscore.js)  

 
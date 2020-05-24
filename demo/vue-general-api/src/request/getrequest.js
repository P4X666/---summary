import server from './server.js';
import qs from 'qs';
function myserver(){
   this.server=server;
   this.nowhandle=null;
}
myserver.prototype.parseRouter=function(name,urlOb){
   var ob=this[name]={};
   Object.keys(urlOb).forEach((item)=>{
      ob[item]=this.sendMes.bind(this,name,item,urlOb[item]);
      this[name][item].state='ready';
   })
}
// 用来指定所要处理的模块
myserver.prototype.v=function(vueob){
  this.nowhandle=vueob;
  return this;
};
myserver.prototype.sendMes=function(moduleName,name,url,userconfig){
     var config=userconfig||{};
     var bindName=config.bindName||name;
     var type=config.type||'get';
     var data=config.data||{};
     var self=this;
     //  在before函数中对接口中追加字段，或者统计某个接口被调用的次数（比如某篇文章被查看的方法）
     var before=function(mes){
    //  用state字段来限制此接口重复调用
       self[moduleName][name].state='ready';
       return mes;
     }
    //  将返回的字段与模块中的字段相绑定
     var defaultFn=function(mes){
       self.nowhandle[bindName]=mes;
     }
     var callback=function(res){
        success(res,defaultFn);
     }
     var success=config.success||defaultFn; 
     var state={
      get:function(){
        var urlqs=url+"?"+qs.stringify(data);
        server.get(urlqs).then(before).then(callback);
      },
      post:function(){
        server.post(url,data).then(before).then(callback);
      }
     }
     if(self[moduleName][name].state=='ready'){
        self[moduleName][name].state='pending';
        state[type](); 
     }
     
}
export default new myserver;




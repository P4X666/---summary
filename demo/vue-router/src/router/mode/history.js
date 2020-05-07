
import BaseHistory from "./base";

export default class Html5History extends BaseHistory {
     constructor(options){
         super(options)
         this.initListener()
     }
    //  监听器，监听路由改变时触发路由跳转函数
     initListener(){
         window.addEventListener('popstate',()=>{
             this.transitionTo(this.getCurrentLocation())
         })
     }
     getCurrentLocation(){
        let path = decodeURI(window.location.pathname) || '/'
        return path + window.location.search + window.location.hash
     }
}
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
// 全局注册一个指令
// Vue.directive("resize",{
// // 挂载监听
//   inserted(el,binding){
//     console.log(el,binding)
//     let callback = binding.value
//     window.addEventListener("resize",()=>callback(window.innerWidth))
//     el._onResize = callback
//   },
// // 解绑
//   unbind(el){
//     if(!el._onResize) return
//     window.removeEventListener("resize",el._onResize)
//     delete el._onResize
//   }
// })

// 
Vue.directive("resize",{
    inserted(el,binding){
      let callback = binding.value//取出传入的绑定函数
      let direction = binding.arg;//传给指令的参数
      let modifiers = binding.modifiers;//一个包含修饰符的对象

      const result = () => {
        return direction === "vertical" ? window.innerHeight : window.innerWidth;
      };
      window.addEventListener("resize",()=>callback(result()))
//  如果传入quiet，则页面初始化之后立即执行一次此函数
      if (modifiers && modifiers.quiet) {
        callback(result());
      }
      el._onResize = callback
    },
    unbind(el){
      if(!el._onResize) return
      window.removeEventListener("resize",el._onResize)
      delete el._onResize
    }
  })

new Vue({
  render: h => h(App),
}).$mount('#app')

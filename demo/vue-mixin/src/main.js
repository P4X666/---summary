import Vue from 'vue'
import App from './App.vue'
import Popup from './piugin/index'

Vue.config.productionTip = false
Vue.prototype.$popup = Popup

new Vue({
  render: h => h(App),
}).$mount('#app')

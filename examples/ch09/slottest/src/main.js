import Vue from 'vue'
// 슬롯 예제를 바꾸기 위한 곳
//import App from './App.vue'
//import App from './AppNamed.vue'
import App from './AppScoped.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

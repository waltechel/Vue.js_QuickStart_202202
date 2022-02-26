import Vue from 'vue'
//import App from './App.vue'
import App from './AppAxiosTest.vue'
// main.js에 한 번 import 하면 된다.
import axios from 'axios'

// vue instance 내부에서 axios를 import 하지 않고도 그냥 사용할 수 있다
// this.$axios 형식으로 사용할 수 있따.
Vue.prototype.$axios = axios;
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')

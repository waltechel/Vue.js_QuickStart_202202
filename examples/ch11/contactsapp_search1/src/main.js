import Vue from 'vue'
import App from './App.vue'
import store from './store'
import ES6Promise from 'es6-promise'

// store 객체를 Vue 인스턴스에 추가하고 
// IE에서도 원활하게 실행될 수 있도록 es6-promise를 참조하여 polyfill() 메서드를 호출합니다.
// IE는 ES6의 promise 객체를 지원하지 않습니다. 
// IE에서 promise 객체를 사용해 비동기 작업을 수행하려면 es6-promise 패키지를 설치해야 합니다.
ES6Promise.polyfill();

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'

import Home from './components/Home';
import About from './components/About';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import UpdatePhoto from './components/UpdatePhoto';

import ES6Promise from 'es6-promise'

ES6Promise.polyfill()
Vue.use(VueRouter);
Vue.config.productionTip = false

const router = new VueRouter({
  mode: "history",
  routes: [
    // / 라면 /home 경로로 강제 이동시킵니다.
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home },
    { path: '/about', name: 'aboout', component: About },
    {
      path: '/contacts', name: 'contacts', component: ContactList,
      // 중첩 라우트를 사용합니다.
      children: [
        { path: 'add', name: 'addcontact', component: ContactForm },
        // props로 사용합니다.
        { path: 'update/:no', name: 'updatecontact', component: ContactForm, props: true },
        { path: 'photo/:no', name: 'updatephoto', component: UpdatePhoto, props: true }
      ]
    },
  ]
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

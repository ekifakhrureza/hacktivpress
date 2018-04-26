import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})

import Vue from 'vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import routes from '../shared/routes'
import Layout from '../components/layout'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({ routes })

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    ...Layout
  }).$mount('#app')
})

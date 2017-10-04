import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'

import store from '../shared/store'
import routes from '../shared/routes'
import Layout from '../components/layout'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(BootstrapVue)

const router = new VueRouter({ routes })

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    store,
    router,
    ...Layout
  })

  app.$mount('#app')
})

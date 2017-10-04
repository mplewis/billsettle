import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '../shared/routes'
import Layout from '../components/layout'

Vue.use(VueRouter)
const router = new VueRouter({ routes })

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    router,
    ...Layout
  }).$mount('#app')
})

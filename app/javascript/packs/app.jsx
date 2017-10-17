import Vue from 'core/vue'
import VueRouter from 'vue-router'

// Put Bootstrap up here so child component CSS is imported later
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from 'core/store'
import apolloProvider from 'core/apollo_provider'
import routes from 'shared/routes'
import Layout from 'components/layout'

const router = new VueRouter({ routes })

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    store,
    router,
    apolloProvider,
    ...Layout
  })

  app.$mount('#app')
})

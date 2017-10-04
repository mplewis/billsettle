import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '../shared/routes'

document.addEventListener('DOMContentLoaded', () => {
  Vue.use(VueRouter)
  const router = new VueRouter({ routes })
  console.log(router)

  const app = {
    router,

    name: 'App',
    render () {
      return <router-view />
    }
  }

  new Vue(app).$mount('#app')
})

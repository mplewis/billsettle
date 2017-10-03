import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '../components/app.jsx'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue(App)
  app.$mount('#app')
})

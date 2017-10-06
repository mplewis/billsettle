import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'
import BootstrapVue from 'bootstrap-vue'

import store from '../shared/store'
import routes from '../shared/routes'
import Layout from '../components/layout'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueApollo)
Vue.use(BootstrapVue)

const router = new VueRouter({ routes })

const apolloClient = new ApolloClient({
  connectToDevTools: true,
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:3000/graphql',
    opts: { credentials: 'same-origin' }
  })
})
const apolloProvider = new VueApollo({ defaultClient: apolloClient })

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    store,
    router,
    apolloProvider,
    ...Layout
  })

  app.$mount('#app')
})

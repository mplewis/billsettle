// This file configures Vue globals consistently for both prod and testing

import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import BootstrapVue from 'bootstrap-vue'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueApollo)
Vue.use(BootstrapVue)

export default Vue

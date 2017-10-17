import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  sessionKey: null
}

const mutations = {
  setSessionKey (state, key) {
    state.sessionKey = key
  }
}

export default new Vuex.Store({
  state,
  mutations
})

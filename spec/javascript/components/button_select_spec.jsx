import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueApollo from 'vue-apollo'
import BootstrapVue from 'bootstrap-vue'

import { mount } from 'avoriaz'
import ButtonSelect from 'components/button_select'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueApollo)
Vue.use(BootstrapVue)

describe('ButtonSelect', function () {
  it('works', function () {
    const comp = mount(ButtonSelect, {
      propsData: {
        stateChanged: console.log,
        buttons: [
          { value: 'hello', name: 'Hello!', color: 'success' },
          { value: 'goodbye', name: 'Goodbye.', color: 'danger' }
        ]
      }
    })
    console.log(comp.html())
    expect(comp).to.exist
  })
})

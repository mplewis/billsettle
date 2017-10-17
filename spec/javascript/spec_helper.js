import 'core/vue'
import { mount } from 'avoriaz'
import GRAPHQL_MOCKS from './graphql_mocks'

Object.assign(window, {
  GRAPHQL_MOCKS,
  mount
})

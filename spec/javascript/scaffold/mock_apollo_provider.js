import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils'
import mocks from './graphql_mocks'

const schema = makeExecutableSchema({
  typeDefs: window.GRAPHQL_SCHEMA_STRING
})
addMockFunctionsToSchema({ schema, mocks })
const networkInterface = mockNetworkInterfaceWithSchema({ schema })
const defaultClient = new ApolloClient({ networkInterface })

export default new VueApollo({ defaultClient })

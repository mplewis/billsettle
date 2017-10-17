import { ApolloClient, createNetworkInterface } from 'apollo-client'
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import { mockNetworkInterfaceWithSchema } from 'apollo-test-utils'

let networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
  opts: { credentials: 'same-origin' }
})

if (process.env.NODE_ENV === 'test') {
  const schema = makeExecutableSchema({
    typeDefs: window.GRAPHQL_SCHEMA_STRING
  })
  addMockFunctionsToSchema({ schema, mocks: window.GRAPHQL_MOCKS })
  networkInterface = mockNetworkInterfaceWithSchema({ schema })
}

export default new ApolloClient({
  connectToDevTools: true,
  networkInterface
})

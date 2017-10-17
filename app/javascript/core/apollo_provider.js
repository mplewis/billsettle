import VueApollo from 'vue-apollo'
import { ApolloClient, createNetworkInterface } from 'apollo-client'

let networkInterface = createNetworkInterface({
  uri: 'http://localhost:3000/graphql',
  opts: { credentials: 'same-origin' }
})

const defaultClient = new ApolloClient({
  connectToDevTools: true,
  networkInterface
})

export default new VueApollo({ defaultClient })

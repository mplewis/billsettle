import VueApollo from 'vue-apollo'
import apolloClient from 'core/apollo_client'

export default new VueApollo({ defaultClient: apolloClient })

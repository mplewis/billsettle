import gql from 'graphql-tag'

import InboxTable from './inbox_table'

export default {
  name: 'InboxData',
  data: () => ({ lineItems: [] }),
  apollo: {
    lineItems: gql`
      {
        lineItems(assigned_to_me: true, assigned: true) {
          id
          creator {
            email
          }
          date
          cents
          desc
          desc_orig
          category
          account
          debt_owner
        }
      }
    `
  },
  methods: {
    handleSubmit ({ itemsToUpdate }) {
      console.log(JSON.stringify(itemsToUpdate))
    }
  },
  render () {
    return (
      <InboxTable lineItems={this.lineItems} submitted={this.handleSubmit} />
    )
  }
}

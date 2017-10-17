import gql from 'graphql-tag'

import IncompleteLayout from './incomplete_layout'

export default {
  name: 'IncompleteData',
  data: () => ({
    lineItems: [],
    lineItemStates: {},
    users: [],
    assigneeId: null
  }),
  apollo: {
    lineItems: gql`
      {
        lineItems(incomplete: true, created_by_me: true) {
          id
          date
          cents
          desc
          desc_orig
          category
          account
        }
      }
    `,
    users: gql`
      {
        users(assignable: true) {
          id
          email
        }
      }
    `
  },
  render () {
    return (
      <IncompleteLayout
        lineItems={this.lineItems}
        assignees={this.users}
        submitted={console.log}
      />
    )
  }
}

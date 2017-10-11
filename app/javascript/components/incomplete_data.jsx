import gql from 'graphql-tag'

import Incomplete from './incomplete'

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
          creator {
            email
          }
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
      <Incomplete
        lineItems={this.lineItems}
        assignees={this.users}
        submitted={this.submitted}
      />
    )
  }
}

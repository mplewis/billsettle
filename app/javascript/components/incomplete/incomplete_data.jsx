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
  methods: {
    updateIncompletes ({ assignee, itemsToUpdate }) {
      this.$apollo
        .mutate({
          variables: {
            assignee_id: assignee.id,
            items: Object.entries(itemsToUpdate).map(([id, debtOwner]) => ({
              id,
              debt_owner: debtOwner
            }))
          },
          mutation: gql`
            mutation($assignee_id: ID!, $items: [LineItemIncompleteType!]!) {
              updateIncompletes(assignee_id: $assignee_id, items: $items) {
                id
                desc
                debt_owner
              }
            }
          `
        })
        .then(() => this.$apollo.queries.lineItems.refetch())
    }
  },
  render () {
    return (
      <IncompleteLayout
        lineItems={this.lineItems}
        assignees={this.users}
        submitted={this.updateIncompletes}
      />
    )
  }
}

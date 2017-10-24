import gql from 'graphql-tag'
import { formatMoney } from 'accounting'
import moment from 'moment'

import 'stylesheets/inbox.sass'

export default {
  name: 'Inbox',
  data: () => ({
    lineItems: []
  }),
  apollo: {
    lineItems: gql`
      {
        lineItems(assigned_to_me: true) {
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
    `
  },
  methods: {
    itemRows () {
      return this.lineItems.map(item =>
        <tr>
          <td>
            {item.creator.email}
          </td>
          <td>
            {/* TODO: Figure out how to output this data from the server as ISO8601 */}
            {moment(item.date).format()}
          </td>
          <td>
            {formatMoney(item.cents / 100)}
          </td>
          <td class="item-desc">
            <p>
              {item.desc}
            </p>
            <pre>
              <code>
                {item.desc_orig}
              </code>
            </pre>
          </td>
          <td>
            {item.category}
          </td>
          <td>
            {item.account}
          </td>
        </tr>
      )
    }
  },
  render () {
    return (
      <b-row>
        <b-col>
          <h1>Inbox</h1>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Creator</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Description</th>
                <th>Category</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {this.itemRows()}
            </tbody>
          </table>
        </b-col>
      </b-row>
    )
  }
}

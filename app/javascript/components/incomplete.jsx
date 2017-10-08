import gql from 'graphql-tag'
import { formatMoney } from 'accounting'
import moment from 'moment'

export default {
  name: 'Incomplete',
  data: () => ({
    lineItems: [],
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
  methods: {
    assignee () {
      return (
        <b-row>
          <b-col>
            <p>
              Assign items to:{' '}
              <select
                onChange={e => (this.assigneeId = e.target.value)}
                class={['custom-select', { 'is-invalid': !this.assigneeId }]}
              >
                {this.optionsForUsers()}
              </select>
            </p>
          </b-col>
        </b-row>
      )
    },
    optionsForUsers () {
      const options = this.users.map(user =>
        <option value={user.id}>
          {user.email}
        </option>
      )
      options.unshift(
        <option selected disabled>
          Select an assignee...
        </option>
      )
      return options
    },
    table () {
      return (
        <b-row>
          <b-col>
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
    },
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
      <div>
        <h1>Incomplete</h1>
        {this.assignee()}
        {this.table()}
      </div>
    )
  }
}

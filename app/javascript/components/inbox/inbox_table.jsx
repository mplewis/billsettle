import moment from 'moment'
import { formatMoney } from 'accounting'

import ButtonSelect from 'components/button_select'
import pluralize from 'shared/pluralize'
import { short } from 'shared/date_formats'

const splitButtons = [
  { name: 'Approve', value: 'approved', color: 'success' },
  { name: 'Reject', value: 'rejected', color: 'danger' }
]

const prettyDebtOwner = {
  split: 'Split',
  assignee: 'All you'
}

export default {
  name: 'Inbox',

  props: {
    lineItems: { type: Array, required: true },
    submitted: { type: Function, required: true }
  },

  data: () => ({
    tableState: {}
  }),

  methods: {
    itemRows () {
      return this.lineItems.map(item =>
        <tr>
          <td>
            {item.creator.email}
          </td>
          <td>
            {moment(item.date).format(short)}
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
          <td>
            {prettyDebtOwner[item.debt_owner]}
          </td>
          <td>
            <ButtonSelect
              stateChanged={state => this.updateTableState(item, state)}
              buttons={splitButtons}
            />
          </td>
          <td>
            <textarea placeholder="Add a note..." />
          </td>
        </tr>
      )
    },

    itemCount () {
      return Object.keys(this.tableState).length
    },

    enabled () {
      return this.itemCount() > 0
    },

    buttonText () {
      if (this.itemCount() === 0) return 'Select some items'
      return `Submit ${pluralize(this.itemCount(), 'item')}`
    },

    updateTableState (lineItem, state) {
      const id = lineItem.id
      if (state) {
        this.$set(this.tableState, id, state)
      } else {
        this.$delete(this.tableState, id)
      }
    }
  },

  render () {
    return (
      <div>
        <b-row>
          <b-col>
            <div class="d-flex justify-content-between">
              <h1>Inbox</h1>
              <p>
                <b-btn
                  variant={this.enabled() ? 'primary' : 'secondary'}
                  disabled={!this.enabled()}
                  onClick={() =>
                    this.submitted({
                      itemsToUpdate: this.tableState
                    })}
                >
                  {this.buttonText()}
                </b-btn>
              </p>
            </div>
          </b-col>
        </b-row>

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
                  <th>Debt owner</th>
                  <th />
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.itemRows()}
              </tbody>
            </table>
          </b-col>
        </b-row>
      </div>
    )
  }
}

import moment from 'moment'
import { formatMoney } from 'accounting'

import ButtonSelect from 'components/button_select'

const splitButtons = [
  { name: 'All me', value: 'creator', color: 'primary' },
  { name: 'Split', value: 'split', color: 'info' },
  { name: 'All them', value: 'assignee', color: 'success' }
]

export default {
  name: 'IncompleteTable',

  props: {
    lineItems: { type: Array, required: true },
    stateChanged: { type: Function, required: true }
  },

  data: () => ({
    lineItemStates: {},
    assigneeId: null
  }),

  methods: {
    buttonSelectFor (lineItem) {
      return (
        <ButtonSelect
          stateChanged={state => this.stateChanged(lineItem, state)}
          buttons={splitButtons}
        />
      )
    },

    descFor (lineItem) {
      return (
        <span>
          <p>
            {lineItem.desc}
          </p>
          <pre>
            <code>
              {lineItem.desc_orig}
            </code>
          </pre>
        </span>
      )
    },

    thead () {
      return (
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Category</th>
            <th>Account</th>
            <th>Debt owner</th>
          </tr>
        </thead>
      )
    },

    tbody () {
      const that = this
      function itemCols (i) {
        return [
          /* TODO: Figure out how to output this data from the server as ISO8601 */
          moment(i.date).format(),
          formatMoney(i.cents / 100),
          that.descFor(i),
          i.category,
          i.account,
          that.buttonSelectFor(i)
        ]
      }
      return (
        <tbody>
          {this.lineItems.map(itemCols).map(cells =>
            <tr>
              {cells.map(cell =>
                <td>
                  {cell}
                </td>
              )}
            </tr>
          )}
        </tbody>
      )
    }
  },

  render () {
    return (
      <table class="table table-striped table-hover">
        {this.thead()}
        {this.tbody()}
      </table>
    )
  }
}

import moment from 'moment'
import { formatMoney } from 'accounting'

import ButtonSelect from './button_select'

function toObject (pairs) {
  return pairs.reduce((map, pair) => {
    map[pair[0]] = pair[1]
    return map
  }, {})
}

const splitButtons = [
  { name: 'All me', value: 'creator', color: 'primary' },
  { name: 'Split', value: 'split', color: 'info' },
  { name: 'All them', value: 'assignee', color: 'success' }
]

export default {
  name: 'Incomplete',

  props: {
    lineItems: { type: Array, required: true },
    assignees: { type: Array, required: true }
    submitted: { type: Function, required: true }
  },

  data: () => ({
    lineItemStates: {},
    assigneeId: null
  }),

  methods: {
    optionsForUsers () {
      const options = this.assignees.map(user =>
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

    buttonSelectFor (lineItem) {
      return (
        <ButtonSelect
          stateChanged={state =>
            this.$set(this.lineItemStates, lineItem.id, state)}
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

    assigneeValid () {
      return Boolean(this.assigneeId)
    },

    itemsReadyToSubmit () {
      return toObject(
        Object.entries(this.lineItemStates).filter(([_, val]) => val)
      )
    },

    submitButton () {
      const count = Object.keys(this.itemsReadyToSubmit()).length
      const ready = count > 0 && this.assigneeValid()
      const s = count === 1 ? '' : 's'
      return (
        <b-btn variant={ready ? 'primary' : 'secondary'} disabled={!ready}>
          Submit {count} Item{s}
        </b-btn>
      )
    },

    assigneeAndSubmit () {
      return (
        <div class="d-flex justify-content-between">
          <p>
            Assign items to:{' '}
            <select
              onChange={e => (this.assigneeId = e.target.value)}
              class={['custom-select', { 'is-invalid': !this.assigneeValid() }]}
            >
              {this.optionsForUsers()}
            </select>
          </p>
          <p>
            {this.submitButton()}
          </p>
        </div>
      )
    },

    thead () {
      return (
        <thead>
          <tr>
            <th>Creator</th>
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
          i.creator.email,
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
      <div>
        <b-row>
          <b-col>
            <h1>Incomplete</h1>
            {this.assigneeAndSubmit()}
            <table class="table table-striped table-hover">
              {this.thead()}
              {this.tbody()}
            </table>
          </b-col>
        </b-row>
      </div>
    )
  }
}

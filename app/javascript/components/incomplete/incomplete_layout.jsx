import AssigneeAndSubmit from './assignee_and_submit'
import IncompleteTable from './incomplete_table'

export default {
  name: 'IncompleteLayout',
  props: {
    lineItems: { type: Array, required: true },
    assignees: { type: Array, required: true },
    submitted: { type: Function, required: true }
  },
  data: () => ({
    tableState: {}
  }),
  methods: {
    updateTableState (lineItem, state) {
      const id = lineItem.id
      if (state) {
        this.$set(this.tableState, id, state)
      } else {
        this.$delete(this.tableState, id)
      }
    },
    clearObsoleteTableState () {
      const lineItemIds = this.lineItems.map(i => i.id)
      Object.keys(this.tableState).forEach(id => {
        if (!lineItemIds.includes(id)) {
          this.$delete(this.tableState, id)
        }
      })
    },
    itemCount () {
      return Object.keys(this.tableState).length
    },
    handleSubmit (assignee) {
      if (this.itemCount() === 0) return
      this.submitted({ assignee, itemsToUpdate: this.tableState })
    }
  },
  beforeUpdate () {
    this.clearObsoleteTableState()
  },
  render () {
    return (
      <b-row>
        <b-col>
          <AssigneeAndSubmit
            assignees={this.assignees}
            itemCount={this.itemCount()}
            submitted={this.handleSubmit}
          />
          <IncompleteTable
            lineItems={this.lineItems}
            stateChanged={this.updateTableState}
          />
        </b-col>
      </b-row>
    )
  }
}

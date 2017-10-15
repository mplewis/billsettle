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
    tableState: {},
    assignee: null
  }),
  methods: {
    updateTableState (id, value) {
      if (value) {
        this.$set(this.tableState, id, value)
      } else {
        this.$delete(this.tableState, id)
      }
    },
    itemCount () {
      return Object.keys(this.tableState).length
    },
    valid () {
      return Boolean(this.assignee && this.itemCount() > 0)
    },
    handleSubmit () {
      if (!this.valid()) return
      this.submitted({
        itemsToUpdate: this.tableState,
        assignee: this.assignee
      })
    }
  },
  render () {
    return (
      <b-row>
        <b-col>
          <h1>Incomplete</h1>
          <AssigneeAndSubmit
            assignees={this.assignees}
            enabled={this.valid()}
            itemCount={this.itemCount()}
            assigneeChanged={assignee => (this.assignee = assignee)}
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

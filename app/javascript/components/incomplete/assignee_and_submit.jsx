import pluralize from 'shared/pluralize'

export default {
  name: 'AssigneeAndSubmit',

  props: {
    assignees: { type: Array, required: true },
    itemCount: { type: Number, required: true },
    submitted: { type: Function, required: true }
  },

  data: () => ({
    assignee: null
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

    buttonText () {
      if (!this.assignee) return 'Select an assignee'
      if (this.itemCount === 0) return 'Select some items'
      return `Submit ${pluralize(this.itemCount, 'item')}`
    },

    enabled () {
      return Boolean(this.assignee && this.itemCount > 0)
    },

    submit () {
      if (!this.enabled()) return
      this.submitted(this.assignee)
    },

    submitButton () {
      return (
        <b-btn
          class="ml-4"
          variant={this.enabled() ? 'primary' : 'secondary'}
          disabled={!this.enabled()}
          onClick={this.submit}
        >
          {this.buttonText()}
        </b-btn>
      )
    }
  },

  render () {
    return (
      <div class="d-flex justify-content-between">
        <h1>Incomplete</h1>
        <p>
          Assign items to:&nbsp;
          <select
            onChange={e => {
              this.assignee = this.assignees.find(a => a.id === e.target.value)
            }}
            class={['custom-select', 'ml-1', { 'is-invalid': !this.assignee }]}
          >
            {this.optionsForUsers()}
          </select>
          {this.submitButton()}
        </p>
      </div>
    )
  }
}

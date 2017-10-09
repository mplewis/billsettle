export default {
  name: 'ButtonSelect',
  props: {
    stateChanged: { type: Function, required: true },
    buttons: { type: Array, required: true }
  },
  data: () => ({ selected: null }),
  methods: {
    renderButtons () {
      return this.buttons.map(button => {
        const active = this.selected === button.value
        const color = active ? button.color : `outline-${button.color}`
        return (
          <b-button
            variant={color}
            onClick={() => this.handleClick(button.value)}
          >
            {button.name}
          </b-button>
        )
      })
    },
    handleClick (value) {
      if (this.selected === value) {
        this.selected = null
      } else {
        this.selected = value
      }
      this.stateChanged(this.selected)
    }
  },
  render () {
    return (
      <b-button-group size="sm">
        {this.renderButtons()}
      </b-button-group>
    )
  }
}

function currentPath () {
  return window.location.href.split('/#').slice(1).join('')
}

export default {
  name: 'NavItem',
  props: {
    for: { type: String, required: true }
  },
  render () {
    return (
      <a
        class={['nav-item', 'nav-link', { active: currentPath() === this.for }]}
      >
        {this.$slots.default}
      </a>
    )
  }
}

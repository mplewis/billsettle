export default {
  name: 'NavItem',
  props: {
    href: { type: String, required: true }
  },
  render () {
    return (
      <a className='nav-item nav-link' href={this.href}>
        {this.$slots.default}
      </a>
    )
  }
}

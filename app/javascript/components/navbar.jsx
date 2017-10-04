import routes from '../shared/routes'

function currentPath () {
  return window.location.href.split('/#').slice(1).join('')
}

export default {
  name: 'Navbar',
  props: {
    inboxCount: { type: Number, required: true }
  },

  methods: {
    renderRoutes () {
      return routes.filter(route => route.path !== '/').map(route => {
        return (
          <b-nav-item active={route.path === currentPath()} to={route.path}>
            {route.name}
          </b-nav-item>
        )
      })
    }
  },

  render () {
    return (
      <div class='bg-light'>
        <b-container fluid>
          <b-navbar type='light' variant='light'>
            <b-navbar-brand to='/'>NavBar</b-navbar-brand>
            <b-nav is-nav-bar>
              {this.renderRoutes()}
            </b-nav>
            <b-nav is-nav-bar class='ml-auto'>
              <b-nav-item href='#'>Sign Out</b-nav-item>
            </b-nav>
          </b-navbar>
        </b-container>
      </div>
    )
  }
}

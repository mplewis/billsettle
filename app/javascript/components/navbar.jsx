import NavItem from './nav_item'
import routes from '../shared/routes'

export default {
  name: 'Navbar',
  props: {
    inboxCount: { type: Number, required: true }
  },

  methods: {
    renderRoutes () {
      return routes.filter(route => route.path !== '/').map(route => {
        return (
          <router-link to={route.path}>
            <NavItem for={route.path}>
              {route.name}
            </NavItem>
          </router-link>
        )
      })
    }
  },

  render () {
    return (
      <div class='bg-light'>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col'>
              <nav class='navbar navbar-expand-lg navbar-light px-0 justify-content-between'>
                <div class='navbar-nav'>
                  <router-link to='/' class='navbar-brand'>
                    Billsettle
                  </router-link>
                  {this.renderRoutes()}
                </div>
                <div class='navbar-nav'>
                  <NavItem
                    rel='nofollow'
                    data-method='delete'
                    href='/users/sign_out'
                  >
                    Sign Out
                  </NavItem>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

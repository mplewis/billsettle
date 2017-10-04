import routes from '../shared/routes'
import axios from 'axios'

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
    },

    signOut () {
      axios.delete('/users/sign_out', { withCredentials: true })
    }
  },

  render () {
    return (
      <div class="bg-light">
        <b-container fluid>
          <b-navbar type="light" variant="light">
            <b-navbar-brand to="/">NavBar</b-navbar-brand>
            <b-nav is-nav-bar>
              {this.renderRoutes()}
            </b-nav>
            <b-nav is-nav-bar class="ml-auto">
              <li class="nav-item">
                <a
                  class="nav-link"
                  rel="nofollow"
                  data-method="delete"
                  href="/users/sign_out"
                >
                  Sign Out
                </a>
              </li>
            </b-nav>
          </b-navbar>
        </b-container>
      </div>
    )
  }
}

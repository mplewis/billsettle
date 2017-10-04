import Navbar from './navbar'

import '../stylesheets/layout.sass'

export default {
  name: 'Layout',
  render () {
    return (
      <div>
        <Navbar inboxCount={0} />
        <b-container fluid class="content">
          <router-view />
        </b-container>
      </div>
    )
  }
}

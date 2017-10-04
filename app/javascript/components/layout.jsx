import Navbar from './navbar'

import '../stylesheets/layout.sass'

export default {
  name: 'Layout',
  render () {
    return (
      <div>
        <Navbar inboxCount={0} />
        <router-view />
      </div>
    )
  }
}

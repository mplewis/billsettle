import Navbar from './navbar'

export default {
  name: 'Layout',
  render () {
    return (
      <div>
        <Navbar />
        <router-view />
      </div>
    )
  }
}

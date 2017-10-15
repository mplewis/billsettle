import Home from '../components/home'
import Incomplete from '../components/incomplete'
import Inbox from '../components/inbox'

export default [
  { path: '/', component: Home },
  { path: '/incomplete', name: 'Incomplete', component: Incomplete },
  { path: '/inbox', component: Inbox }
]

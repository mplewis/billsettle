import Home from '../components/home'
import IncompleteData from '../components/incomplete_data'
import Inbox from '../components/inbox'

export default [
  { path: '/', component: Home },
  { path: '/incomplete', name: 'Incomplete', component: IncompleteData },
  { path: '/inbox', component: Inbox }
]

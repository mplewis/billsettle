import NavItem from './nav_item'

export default {
  name: 'Navbar',
  props: {
    inboxCount: { type: Number, required: true }
  },

  render () {
    return (
      <div className='bg-light'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col'>
              <nav className='navbar navbar-expand-lg navbar-light px-0 justify-content-between'>
                <div className='navbar-nav'>
                  <a className='navbar-brand' href='/'>Billsettle</a>
                  <NavItem href='/inbox'>Inbox&nbsp;
                    <span className='badge badge-danger'>{this.inboxCount}</span>
                  </NavItem>
                  <NavItem href='/history'>My items</NavItem>
                  <NavItem href='/import_invoice'>Import</NavItem>
                </div>
                <div className='navbar-nav'>
                  <NavItem rel='nofollow' data-method='delete' href='/users/sign_out'>Sign Out</NavItem>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

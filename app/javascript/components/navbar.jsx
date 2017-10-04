import NavItem from './nav_item'

export default {
  name: 'Navbar',
  props: {
    inboxCount: { type: Number, required: true }
  },

  render () {
    return (
      <div class='bg-light'>
        <div class='container-fluid'>
          <div class='row'>
            <div class='col'>
              <nav class='navbar navbar-expand-lg navbar-light px-0 justify-content-between'>
                <div class='navbar-nav'>
                  <a class='navbar-brand' href='/'>Billsettle</a>
                  <NavItem href='/inbox'>Inbox&nbsp;
                    <span class='badge badge-danger'>{this.inboxCount}</span>
                  </NavItem>
                  <NavItem href='/history'>My items</NavItem>
                  <NavItem href='/import_invoice'>Import</NavItem>
                </div>
                <div class='navbar-nav'>
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

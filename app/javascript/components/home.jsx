import gql from 'graphql-tag'

export default {
  name: 'Home',
  data: () => ({
    users: []
  }),
  apollo: {
    users: gql`
      {
        users {
          id
          email
        }
      }
    `
  },
  methods: {
    userRows () {
      return this.users.map(user =>
        <tr>
          <td>
            {user.id}
          </td>
          <td>
            {user.email}
          </td>
        </tr>
      )
    }
  },
  render () {
    return (
      <b-row>
        <b-col>
          <h1>All Users</h1>
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>id</th>
                <th>email</th>
              </tr>
            </thead>
            <tbody>
              {this.userRows()}
            </tbody>
          </table>
        </b-col>
      </b-row>
    )
  }
}

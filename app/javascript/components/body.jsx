import gql from 'graphql-tag'

export default {
  name: 'Body',
  data: () => ({
    allUsers: []
  }),
  apollo: {
    allUsers: gql`
      {
        allUsers {
          id
          email
        }
      }
    `
  },
  methods: {
    userRows () {
      return this.allUsers.map(user =>
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

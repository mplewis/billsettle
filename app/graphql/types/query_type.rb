Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :allUsers, !types[Types::UserType] do
    description 'All users'
    resolve ->(obj, args, ctx) {
      User.all
    }
  end
end

Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :updateIncompletes, !types[!Types::LineItemType] do
    argument :assignee_id, !types.ID
    argument :items, !types[!LineItemIncompleteType]

    resolve ->(_obj, args, _ctx) {
      assignee = User.find args[:assignee_id]
      args[:items].each do |item|
        LineItem.find(item[:id])
          .update!(assignee: assignee, debt_owner: item[:debt_owner])
      end
      LineItem.where(id: args[:items].map { |i| i.id })
    }
  end
end

LineItemIncompleteType = GraphQL::InputObjectType.define do
  name 'LineItemIncompleteType'
  argument :id, !types.ID
  argument :debt_owner, types.String
end

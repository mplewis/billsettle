Types::MutationType = GraphQL::ObjectType.define do
  name 'Mutation'

  field :updateIncompletes, !types[!Types::LineItemType] do
    argument :assignee_id, !types.ID
    argument :items, !types[!LineItemIncompleteType]

    resolve ->(_obj, args, _ctx) {
      Mutations::IncompleteUpdater.update! args[:assignee_id], args[:items]
    }
  end
end

LineItemIncompleteType = GraphQL::InputObjectType.define do
  name 'LineItemIncompleteType'
  argument :id, !types.ID
  argument :debt_owner, types.String
end

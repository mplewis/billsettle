Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :users, !types[Types::UserType] do
    argument :assignable, types.Boolean
    resolve ->(_obj, args, _ctx) do
      return User.all.reject { |u| ctx[:current_user] == u } if args[:assignable]
      User.all
    end
  end

  field :lineItems, !types[Types::LineItemType] do
    argument :creator, types.ID
    argument :assignee, types.ID
    argument :created_by_me, types.Boolean
    argument :assigned_to_me, types.Boolean
    argument :incomplete, types.Boolean
    argument :assigned, types.Boolean
    argument :done, types.Boolean
    resolve ->(_obj, args, ctx) do
      items = LineItem.all
      items = items.where creator_id: args[:creator] if args[:creator]
      items = items.where assignee_id: args[:assignee] if args[:assignee]
      items = items.where creator: ctx[:current_user] if args[:created_by_me]
      items = items.where assignee: ctx[:current_user] if args[:assigned_to_me]
      items = items.select(&:incomplete?) if args[:incomplete]
      items = items.select(&:assigned?) if args[:assigned]
      items = items.select(&:done?) if args[:done]
      items
    end
  end
end

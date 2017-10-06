Types::QueryType = GraphQL::ObjectType.define do
  name 'Query'

  field :allUsers, !types[Types::UserType] do
    description 'All users'
    resolve ->(_obj, _args, _ctx) do
      User.all
    end
  end

  field :allLineItems, !types[Types::LineItemType] do
    description 'All line items'
    resolve ->(_obj, _args, _ctx) do
      LineItem.all
    end
  end

  field :lineItemsCreatedByMe, !types[Types::LineItemType] do
    description 'Line items assigned to the current user'
    resolve ->(_obj, _args, ctx) do
      LineItem.where creator: ctx[:current_user]
    end
  end

  field :lineItemsAssignedToMe, !types[Types::LineItemType] do
    description 'Line items assigned to the current user'
    resolve ->(_obj, _args, ctx) do
      LineItem.where assignee: ctx[:current_user]
    end
  end
end

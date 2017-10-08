Types::LineItemType = GraphQL::ObjectType.define do
  name 'LineItem'

  field :id, !types.Int
  field :created_at, !types.String
  field :updated_at, !types.String

  field :txn_type, types.String
  field :status, !types.String
  field :debt_owner, types.String

  field :date, !types.String
  field :cents, !types.Int
  field :account, !types.String
  field :category, !types.String

  field :desc, types.String
  field :desc_orig, types.String
  field :note, types.String

  field :creator, !Types::UserType
  field :assignee, !Types::UserType
end

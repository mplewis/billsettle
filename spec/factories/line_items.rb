# == Schema Information
#
# Table name: line_items
#
#  id          :integer          not null, primary key
#  date        :datetime
#  desc        :text
#  desc_orig   :text
#  cents       :integer
#  txn_type    :integer
#  account     :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  category    :text
#  creator_id  :integer
#  assignee_id :integer
#  note        :text
#  status      :integer          default("pending")
#  debt_owner  :integer
#
# Indexes
#
#  index_line_items_on_assignee_id  (assignee_id)
#  index_line_items_on_creator_id   (creator_id)
#

FactoryGirl.define do
  factory :line_item do
    association :creator, factory: :user
    association :assignee, factory: :user
  end
end

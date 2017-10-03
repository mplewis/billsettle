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
#
# Indexes
#
#  index_line_items_on_assignee_id  (assignee_id)
#  index_line_items_on_creator_id   (creator_id)
#

class LineItem < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  belongs_to :assignee, class_name: 'User'

  enum txn_type: {
    debit: 1,
    credit: 2,
  }

  enum status: {
    pending: 1,
    approved: 2,
    rejected: 3,
  }
end

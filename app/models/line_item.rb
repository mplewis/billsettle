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

  enum debt_owner: {
    creator: 1,
    assignee: 2,
    split: 3,
  }

  def incomplete?
    !assigned? && !done?
  end

  def assigned?
    !done? && debt_owner.present? && assignee.present?
  end

  def done?
    debt_owner == 'creator' || status == 'approved' || status == 'rejected'
  end
end

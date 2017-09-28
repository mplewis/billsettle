# == Schema Information
#
# Table name: line_items
#
#  id         :integer          not null, primary key
#  date       :datetime
#  desc       :text
#  desc_orig  :text
#  cents      :integer
#  txn_type   :integer
#  account    :text
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class LineItem < ApplicationRecord
  enum txn_type: {
    debit: 1,
    credit: 2,
  }
end

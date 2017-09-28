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
#  category   :text
#

require 'rails_helper'

RSpec.describe LineItem, type: :model do
  subject do
    LineItem.new date: Date.new, desc: '7-Eleven', desc_orig: '7-ELEVEN**', cents: 199, txn_type: 'debit',
                 account: 'Chase', category: 'Fast Food'
  end

  describe 'txn_type' do
    it 'works like an enum' do
      expect(subject.debit?).to be true
      expect(subject.txn_type).to eq 'debit'
    end
  end
end

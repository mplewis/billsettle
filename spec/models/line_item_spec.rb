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

require 'rails_helper'

RSpec.describe LineItem, type: :model do
  subject { LineItem.new **attribs }
  let :attribs { base_attribs }
  let :base_attribs do
    {date: Date.new, desc: '7-Eleven', desc_orig: '7-ELEVEN**', cents: 199, txn_type: 'debit',
     account: 'Chase', category: 'Fast Food'}
  end

  describe 'txn_type' do
    it 'works like an enum' do
      expect(subject.debit?).to be true
      expect(subject.txn_type).to eq 'debit'
    end
  end

  describe 'states' do
    let :user { User.new(email: 'test', password: 'test') }

    context 'with a fresh new line item' do
      it 'is incomplete' do
        expect(subject.incomplete?).to be true
        expect(subject.assigned?).to be false
        expect(subject.done?).to be false
      end
    end

    context 'after being assigned' do
      let :attribs { base_attribs.merge({assignee: user}) }
      it 'is incomplete' do
        expect(subject.incomplete?).to be true
        expect(subject.assigned?).to be false
        expect(subject.done?).to be false
      end
    end

    context 'after being assigned and adding debt owner' do
      let :attribs { base_attribs.merge({assignee: user, debt_owner: 'split'}) }
      it 'is assigned' do
        expect(subject.incomplete?).to be false
        expect(subject.assigned?).to be true
        expect(subject.done?).to be false
      end
    end

    context 'after being assigned and setting debt owner to creator' do
      let :attribs { base_attribs.merge({debt_owner: 'creator'}) }
      it 'is done' do
        expect(subject.incomplete?).to be false
        expect(subject.assigned?).to be false
        expect(subject.done?).to be true
      end
    end

    context 'when status is approved' do
      let :attribs { base_attribs.merge({assignee: user, debt_owner: 'split', status: 'approved'}) }
      it 'is done' do
        expect(subject.incomplete?).to be false
        expect(subject.assigned?).to be false
        expect(subject.done?).to be true
      end
    end

    context 'when status is rejected' do
      let :attribs { base_attribs.merge({assignee: user, debt_owner: 'split', status: 'approved'}) }
      it 'is done' do
        expect(subject.incomplete?).to be false
        expect(subject.assigned?).to be false
        expect(subject.done?).to be true
      end
    end
  end
end

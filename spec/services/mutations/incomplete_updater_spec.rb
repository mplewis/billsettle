require 'rails_helper'

describe Mutations::IncompleteUpdater do
  describe '.update!' do
    subject { described_class.update! assignee.id, items_to_update }
    let(:assignee) { create :user }
    let(:items_to_update) do
      [
        { id: 1, debt_owner: 'assignee' },
        { id: 2, debt_owner: 'creator' },
        { id: 3, debt_owner: 'split' },
      ]
    end

    before do
      create(:line_item, id: 1)
      create(:line_item, id: 2)
      create(:line_item, id: 3)
    end

    it 'updates line item debt owners' do
      expect(subject.count).to be 3
      expect(LineItem.find(1).debt_owner).to eq 'assignee'
      expect(LineItem.find(2).debt_owner).to eq 'creator'
      expect(LineItem.find(3).debt_owner).to eq 'split'
    end
  end
end

require 'rails_helper'

describe Mutations::InboxUpdater do
  describe '.update!' do
    subject { described_class.update! items_to_update }
    let(:items_to_update) { [{ id: 1, status: 'approved' }, { id: 2, status: 'rejected' }] }

    before do
      create(:line_item, id: 1)
      create(:line_item, id: 2)
    end

    it 'updates line item debt owners' do
      expect(subject.count).to be 2
      expect(LineItem.find(1).status).to eq 'approved'
      expect(LineItem.find(2).status).to eq 'rejected'
    end
  end
end

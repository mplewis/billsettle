require 'rails_helper'

describe InvoiceImporter do
  describe '.import_csv' do
    subject { described_class.import_csv csv }
    let(:csv) do
      <<~CSV
        "Date","Description","Original Description","Amount","Transaction Type","Category","Account Name","Labels","Notes"
        "8/15/2017","King Soopers","KING SOOPERS #11","14.51","debit","Groceries","Chase","",""
        "9/10/2017","Roostercat Coffee Hou","SQ *ROOSTERCAT COFFEE HOU","3.40","debit","Coffee Shops","Amex","",""
        "9/12/2017","Winchells Donut House","WINCHELLS DONUT HOUSE","8.66","debit","Fast Food","Simple","",""
      CSV
    end
    let(:item) { LineItem.first }

    it 'creates line items properly' do
      expect(subject.count).to be 3
      expect(item.date).to eq Date.new(2017, 8, 15)
      expect(item.desc).to eq 'King Soopers'
      expect(item.desc_orig).to eq 'KING SOOPERS #11'
      expect(item.cents).to eq 1451
      expect(item.txn_type).to eq 'debit'
      expect(item.debit?).to be true
      expect(item.category).to eq 'Groceries'
      expect(item.account).to eq 'Chase'
    end
  end
end

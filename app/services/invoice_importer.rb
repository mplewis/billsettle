require 'csv'

class InvoiceImporter
  class << self
    def import_csv(raw_text)
      rows = CSV.parse(raw_text, headers: true, header_converters: :symbol)
      rows.map { |row| line_item_for_row row }
    end

    private

    def line_item_for_row(row)
      LineItem.create! date: Date.strptime(row[:date], '%m/%d/%Y'),
                       desc: row[:description],
                       desc_orig: row[:original_description],
                       cents: Monetize.parse("$#{row[:amount]}").cents,
                       txn_type: row[:transaction_type],
                       category: row[:category],
                       account: row[:account_name]
    end
  end
end
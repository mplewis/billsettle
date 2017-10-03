require 'csv'

class InvoiceImporter
  def self.import_csv(raw_text, creator, assignee)
    new(creator, assignee).import_csv raw_text
  end

  def initialize(creator, assignee)
    @creator = creator
    @assignee = assignee
  end
  private_class_method :new

  def import_csv(raw_text)
    CSV.parse(raw_text, headers: true, header_converters: :symbol).map { |row| line_item_for_row row }
  end

  def line_item_for_row(row)
    LineItem.create! date: Date.strptime(row[:date], '%m/%d/%Y'),
                     desc: row[:description],
                     desc_orig: row[:original_description],
                     cents: Monetize.parse("$#{row[:amount]}").cents,
                     txn_type: row[:transaction_type],
                     category: row[:category],
                     account: row[:account_name],
                     creator: @creator,
                     assignee: @assignee
  end
end

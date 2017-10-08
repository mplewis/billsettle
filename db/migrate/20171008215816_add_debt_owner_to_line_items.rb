class AddDebtOwnerToLineItems < ActiveRecord::Migration[5.1]
  def change
    add_column :line_items, :debt_owner, :integer
  end
end

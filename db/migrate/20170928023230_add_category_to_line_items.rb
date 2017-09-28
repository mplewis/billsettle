class AddCategoryToLineItems < ActiveRecord::Migration[5.1]
  def change
    add_column :line_items, :category, :text
  end
end

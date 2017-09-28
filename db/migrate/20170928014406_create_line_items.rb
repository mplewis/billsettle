class CreateLineItems < ActiveRecord::Migration[5.1]
  def change
    create_table :line_items do |t|
      t.datetime :date
      t.text :desc
      t.text :desc_orig
      t.integer :cents
      t.integer :txn_type
      t.text :account

      t.timestamps
    end
  end
end

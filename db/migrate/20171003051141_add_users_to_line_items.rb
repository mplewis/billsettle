class AddUsersToLineItems < ActiveRecord::Migration[5.1]
  def change
    add_reference :line_items, :creator, foreign_key: true
    add_reference :line_items, :assignee, foreign_key: true
  end
end

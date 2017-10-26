class Mutations::IncompleteUpdater
  def self.update!(assignee_id, items_to_update)
    new(assignee_id, items_to_update).update!
  end

  def initialize(assignee_id, items_to_update)
    @assignee_id = assignee_id
    @items_to_update = items_to_update
  end
  private_class_method :new

  def update!
    @items_to_update.each do |item_data|
      LineItem.find(item_data[:id])
        .update!(assignee: assignee, debt_owner: item_data[:debt_owner])
    end

    LineItem.where id: item_ids
  end

  def assignee
    User.find @assignee_id
  end

  def item_ids
    @items_to_update.map { |item_data| item_data[:id] }
  end
end

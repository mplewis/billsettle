class Mutations::InboxUpdater
  def self.update!(items_to_update)
    new(items_to_update).update!
  end

  def initialize(items_to_update)
    @items_to_update = items_to_update
  end
  private_class_method :new

  def update!
    @items_to_update.each do |item_data|
      LineItem.find(item_data[:id])
        .update!(status: item_data[:status])
    end

    LineItem.where id: item_ids
  end

  def item_ids
    @items_to_update.map { |item_data| item_data[:id] }
  end
end

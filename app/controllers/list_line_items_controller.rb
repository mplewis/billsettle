class ListLineItemsController < ApplicationController
  def mine
    @items = LineItem.where creator: current_user
  end

  def theirs
    @items = LineItem.where assignee: current_user
  end
end

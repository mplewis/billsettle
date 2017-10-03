class LineItemsController < ApplicationController
  def inbox
    @items = LineItem.where assignee: current_user
  end

  def archive
    @items = LineItem.where creator: current_user
  end

  def history
    @items = LineItem.where creator: current_user
  end
end

class LineItemsController < ApplicationController
  def inbox
    @items = LineItem.where assignee: current_user, status: [:pending]
  end

  def archive
    @items = LineItem.where assignee: current_user, status: [:approved, :rejected]
  end

  def history
    @items = LineItem.where creator: current_user
  end
end

module ApplicationHelper
  def other_users_by_email
    User.all.reject { |u| current_user == u }.map { |u| [u.email, u.id] }
  end

  def inbox_count
    return 0 unless current_user
    LineItem.where(assignee: current_user, status: [:pending]).count
  end
end

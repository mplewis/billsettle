module ApplicationHelper
  def other_users_by_email
    User.all.reject { |u| current_user == u }.map { |u| [u.email, u.id] }
  end
end

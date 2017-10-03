Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'
  resources :import_invoice, only: [:index, :create]
  get 'items/mine', to: 'list_line_items#mine'
  get 'items/theirs', to: 'list_line_items#theirs'
end

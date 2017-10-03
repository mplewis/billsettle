Rails.application.routes.draw do
  devise_for :users
  root to: 'frontend#app'
  resources :import_invoice, only: [:index, :create]
  get 'inbox', to: 'line_items#inbox'
  put 'inbox', to: 'line_items#update'
  get 'archive', to: 'line_items#archive'
  get 'history', to: 'line_items#history'
end

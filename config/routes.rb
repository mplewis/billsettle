Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql'
  end

  devise_for :users

  authenticate do
    root to: 'frontend#app'

    post '/graphql', to: 'graphql#execute'

    resources :import_invoice, only: [:index, :create]
    get 'inbox', to: 'line_items#inbox'
    put 'inbox', to: 'line_items#update'
    get 'archive', to: 'line_items#archive'
    get 'history', to: 'line_items#history'
  end
end

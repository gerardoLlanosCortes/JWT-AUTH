Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'auth/register', to: 'users#create'
      post 'auth/login', to: 'sessions#login'
      post 'auth/refresh', to: 'sessions#refresh'
      # delete 'auth/logout', to: 'sessions#destroy'

      
      resources :users, only: [:index, :show, :update, :destroy]
      resources :posts, only: [:index, :show, :create, :update, :destroy]
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end

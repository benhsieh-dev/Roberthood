Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :new, :index, :show]
    resource :session, only: [:new, :create, :destroy]
    resources :news, only: [:new]
    get "/stocks/quote/:symbol" => "stocks#quote"
    get "/stocks/chart/:symbol" => "stocks#chart"
end


  root "static_pages#root"
    # get "/us/en" => "static_pages#root"
end

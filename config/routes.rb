Basecamp::Application.routes.draw do
  root :to => "projects#index"

  resources :users
  resources :projects
  resource :session, :only => [:new, :create, :destroy]
end

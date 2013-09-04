Basecamp::Application.routes.draw do
  root :to => "projects#index"

  resources :users
  resources :projects
  resources :task_lists
  resources :tasks
  resource :session, :only => [:new, :create, :destroy]
end

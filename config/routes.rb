Basecamp::Application.routes.draw do
  root :to => "projects#index"

  resources :users
  resources :projects do
    resources :task_lists
  end
  resources :tasks
  resource :session, :only => [:new, :create, :destroy]
end

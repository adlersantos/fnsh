Basecamp::Application.routes.draw do
  root :to => "projects#index"

  resources :users
  resources :projects do
    resources :task_lists do
      resources :tasks, :except => [:index]
    end
  end

  resources :tasks, :only => [:index, :update]
  resource :session, :only => [:new, :create, :destroy]
end

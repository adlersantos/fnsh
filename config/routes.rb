Basecamp::Application.routes.draw do
  root :to => "projects#index"

  resources :users
  resources :projects do
    resources :task_lists, :except => [:index] do
      resources :tasks, :except => [:index]
    end
  end

  resources :task_lists, :only => [:index]
  resources :tasks, :only => [:index, :update]
  resource :session, :only => [:new, :create, :destroy]
end

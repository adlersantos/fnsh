Basecamp::Application.routes.draw do
  root :to => "projects#index"

  resources :users, :only => [:index, :create, :update]

  resources :projects, :only => [:index, :create, :destroy, :update] do
    resources :user_projects, :only => [:create]
    resources :task_lists, :only => [:create]
  end

  resources :task_lists, :only => [:index, :destroy, :update] do
    resources :tasks, :only => [:create]
  end

  resources :tasks, :only => [:index, :destroy, :update] do
    resources :comments, :only => [:create]
    resources :subtasks, :only => [:create]
  end

  resources :subtasks, :only => [:index, :destroy, :update]

  resource :session, :only => [:new, :create, :destroy]
end

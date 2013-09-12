Basecamp::Application.routes.draw do
  root :to => "projects#index"

  resources :users
  resources :projects do
    resources :user_projects
    resources :task_lists, :except => [:index] do
      resources :tasks, :except => [:index]
    end
  end

  resources :comments
  resources :task_lists, :only => [:index]
  resources :subtasks, :only => [:index, :destroy]
  resources :tasks, :only => [:index, :update] do
    resources :subtasks, :except => [:index]
  end
  resource :session, :only => [:new, :create, :destroy]
end

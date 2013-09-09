object @project
attributes :id, :name, :owner_id, :description

child :users do
  attributes :id, :username, :display_name
end

child :task_lists do
  attributes :id, :title

  child :tasks do
    attributes :id, :finished, :name, :task_list_id, :assignee_id

    child :comments do
      attributes :id, :body, :author_id, :task_id
    end
  end
end
object @project
attributes :id, :name, :owner_id

child :users do
  attributes :id, :username
end

child :task_lists do
  attributes :id, :title

  child :tasks do
    attributes :id, :finished, :name, :task_list_id
  end
end
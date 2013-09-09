collection @tasks
attributes :id, :name, :finished, :task_list_id, :description

child :task_list do
  attributes :id, :title
end

child :project do
  attributes :id
end
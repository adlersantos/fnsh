object @task_list
attributes :id, :title, :project_id, :position

child :tasks do
  attributes :id, :finished, :name, :task_list_id
end

child :project do
  attributes :id, :name
end
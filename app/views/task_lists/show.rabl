object @task_list
attributes :id, :title, :project_id

child :tasks do
  attributes :id, :finished, :name, :task_list_id
end
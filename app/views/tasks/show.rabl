object @task
attributes :id, :name, :finished, :task_list_id, :description

child :project do
  attributes :id
end
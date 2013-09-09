object @task
attributes :id, :name, :finished, :task_list_id, :description, :assignee_id

child :project do
  attributes :id
end

child :comments do
  attributes :id, :body, :author_id, :task_id
end
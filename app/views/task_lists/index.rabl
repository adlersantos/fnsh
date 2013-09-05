collection @task_lists
attributes :id, :title, :project_id

child(:tasks) do
  attributes :id, :name, :task_list_id, :finished
end

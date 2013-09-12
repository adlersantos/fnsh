collection @task_lists
attributes :id, :title, :project_id, :position

child(:tasks) do
  attributes :id, :name, :task_list_id, :finished, :description, :position
end

child(:project) do
  attributes :id, :name
end

node :project_id do
  @project_id
end

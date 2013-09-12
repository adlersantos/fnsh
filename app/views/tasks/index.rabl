collection @tasks
attributes :id, :name, :finished, :task_list_id, :description, :assignee_id, :due_date, :position

child :task_list do
  attributes :id, :title, :position
end

child :project do
  attributes :id
end

child :comments do
  attributes :id, :body, :author_id, :task_id
end

child(:subtasks) do
  attributes :id, :finished, :name, :task_id
end

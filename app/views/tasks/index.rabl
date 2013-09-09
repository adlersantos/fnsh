collection @tasks
attributes :id, :name, :finished, :task_list_id, :description, :assignee_id

child :task_list do
  attributes :id, :title
end

child :project do
  attributes :id
end

child :comments do
  attributes :id, :body, :author_id, :task_id
end
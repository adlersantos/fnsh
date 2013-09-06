collection @tasks
attributes :id, :name, :finished, :task_list_id

child :task_list do
  attributes :id, :title
end
object @comment
attributes :id, :body, :task_id

child(:author) do
  attributes :username, :display_name
end
if current_user
  collection current_user.projects
  attributes :id, :name

  child(:users) do
    attributes :id, :username
  end

  child(:task_lists) do
    attributes :id, :title
  end
end
if current_user
  collection current_user.projects
  attributes :id, :name
end
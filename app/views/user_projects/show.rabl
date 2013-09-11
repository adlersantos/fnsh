object @user
attributes :id, :username, :display_name

child :projects do
  attributes :id, :name, :owner_id, :description
end
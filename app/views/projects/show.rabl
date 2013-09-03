object @project
attributes :id, :name, :owner_id

child :users do
  attributes :id, :username
end
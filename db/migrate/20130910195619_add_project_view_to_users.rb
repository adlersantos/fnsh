class AddProjectViewToUsers < ActiveRecord::Migration
  def change
    add_column :users, :project_view, :integer
  end
end

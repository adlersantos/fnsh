class ChangeTaskPositionToFloat < ActiveRecord::Migration
  def change
    remove_column :tasks, :position
    add_column :tasks, :position, :float
  end
end

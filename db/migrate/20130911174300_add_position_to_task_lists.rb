class AddPositionToTaskLists < ActiveRecord::Migration
  def change
    add_column :task_lists, :position, :float
  end
end

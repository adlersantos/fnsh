class ChangeDueDateToInteger < ActiveRecord::Migration
  def change
    remove_column :tasks, :due_date
    add_column :tasks, :due_date, :integer
  end
end

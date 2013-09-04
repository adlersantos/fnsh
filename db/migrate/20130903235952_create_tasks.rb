class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :name
      t.integer :task_list_id
      t.boolean :finished

      t.timestamps
    end
  end
end

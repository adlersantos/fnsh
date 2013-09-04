class Task < ActiveRecord::Base
  attr_accessible :finished, :name, :task_list_id

  belongs_to :task_list,
    class_name: "TaskList",
    foreign_key: :task_list_id
end

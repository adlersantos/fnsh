class Subtask < ActiveRecord::Base
  attr_accessible :finished, :name, :task_id

  belongs_to :task,
    class_name: "Task",
    foreign_key: :task_id
end

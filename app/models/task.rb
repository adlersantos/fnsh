class Task < ActiveRecord::Base
  attr_accessible :finished, :name, :description, :task_list_id

  belongs_to :task_list,
    class_name: "TaskList",
    foreign_key: :task_list_id

  delegate :project,
    to: :task_list,
    allow_nil: true

  has_many :comments,
    class_name: "Comment",
    foreign_key: :task_id
end

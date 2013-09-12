class Task < ActiveRecord::Base
  attr_accessible :finished, :name, :description, :task_list_id, :assignee_id, :due_date, :position

  belongs_to :task_list,
    class_name: "TaskList",
    foreign_key: :task_list_id

  delegate :project,
    to: :task_list,
    allow_nil: true

  belongs_to :assignee,
    class_name: "User",
    foreign_key: :assignee_id

  has_many :comments,
    class_name: "Comment",
    foreign_key: :task_id

  has_many :subtasks,
    class_name: "Subtask",
    foreign_key: :task_id
end

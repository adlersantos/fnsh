class TaskList < ActiveRecord::Base
  attr_accessible :project_id, :title, :position

  validates :project_id, :presence => true

  belongs_to :project,
    class_name: "Project",
    foreign_key: :project_id

  has_many :tasks,
    class_name: "Task",
    foreign_key: :task_list_id
end

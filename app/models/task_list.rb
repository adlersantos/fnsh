class TaskList < ActiveRecord::Base
  attr_accessible :project_id, :title

  belongs_to :project
    class_name: "Project",
    foreign_key: :project_id
end

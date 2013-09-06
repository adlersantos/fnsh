class Project < ActiveRecord::Base

  attr_accessible :name, :users

  validates :name, :presence => true

  has_many :user_projects,
    class_name: "UserProject",
    foreign_key: :project_id

  has_many :users,
    through: :user_projects,
    source: :user

  has_many :task_lists,
    class_name: "TaskList",
    foreign_key: :project_id
end

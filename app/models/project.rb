class Project < ActiveRecord::Base

  attr_accessible :name

  validates :name, :presence => true

  has_many :user_projects,
    class_name: "UserProject",
    foreign_key: :project_id

  has_many :users,
    class_name: "User",
    foreign_key: :user_id
end

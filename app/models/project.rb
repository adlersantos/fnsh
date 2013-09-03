class Project < ActiveRecord::Base

  attr_accessible :name, :users

  validates :name, :presence => true

  has_many :user_projects,
    class_name: "UserProject",
    foreign_key: :project_id

  has_many :users,
    through: :user_projects,
    source: :user
end

class Project < ActiveRecord::Base

  attr_accessible :name, :users, :users_attributes

  validates :name, :presence => true

  has_many :user_projects,
    class_name: "UserProject",
    foreign_key: :project_id

  has_many :users,
    through: :user_projects,
    source: :user

  # accepts_nested_attributes_for :users
end

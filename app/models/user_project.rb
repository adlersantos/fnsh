class UserProject < ActiveRecord::Base

  attr_accessible :project_id, :user_id

  belongs_to :project,
    class_name: "Project",
    foreign_key: :project_id

  belongs_to :user,
    class_name: "User",
    foreign_key: :user_id
end

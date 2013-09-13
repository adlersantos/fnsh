class Comment < ActiveRecord::Base
  attr_accessible :author_id, :body, :task_id

  validates :author_id, :body, :task_id, :presence => true

  belongs_to :task,
    class_name: "Task",
    foreign_key: :task_id

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id
end

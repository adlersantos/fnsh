require 'bcrypt'

class User < ActiveRecord::Base

  attr_accessible :password, :username
  attr_reader :password

  validates :username, :uniqueness => true
  validates :username, :password_digest, :presence => true
  validates :password, :length => { :minimum => 3 }

  has_many :user_projects,
    class_name: "UserProject",
    foreign_key: :user_id

  has_many :projects,
    through: :user_projects,
    source: :project

  def password
    @password || self.password_digest
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def verify_password(password)
    BCrypt::Password.new(self.password_digest) == password
  end
end

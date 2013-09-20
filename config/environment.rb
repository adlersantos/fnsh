require File.expand_path('../application', __FILE__)

Basecamp::Application.initialize!

if Rails.env.production?
  ActionMailer::Base.smtp_settings = {
    :address        => 'smtp.sendgrid.net',
    :port           => '587',
    :authentication => :plain,
    :user_name      => ENV['SENDGRID_USERNAME'],
    :password       => ENV['SENDGRID_PASSWORD'],
    :domain         => 'heroku.com'
  }

  ActionMailer::Base.delivery_method ||= :smtp

elsif Rails.env.development?

  ActionMailer::Base.delivery_method = :letter_opener

end
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

  config.paperclip_defaults = {
    :storage => :s3,
    :s3_credentials => {
      :bucket => ENV['AWS_S3_AVATARS_BUCKET'],
      :access_key_id => ENV['AWS_ACCESS_KEY_ID'],
      :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'],
      :s3_host_name => 's3.amazonaws.com'
    }
  }

  ActionMailer::Base.delivery_method ||= :smtp

elsif Rails.env.development?

  ActionMailer::Base.delivery_method = :letter_opener

end
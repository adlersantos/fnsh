Basecamp::Application.configure do
  config.paperclip_defaults = {
    :storage => :s3,
    :s3_credentials => {
      :bucket => "Fnsh-Avatars",
      :access_key_id => Figaro.env.aws_access_key_id,
      :secret_access_key => Figaro.env.aws_secret_access_key,
      :s3_host_name => 's3.amazonaws.com'
    }
  }

  config.cache_classes = false

  config.whiny_nils = true

  config.consider_all_requests_local       = true
  config.action_controller.perform_caching = false

  config.action_mailer.raise_delivery_errors = false

  config.active_support.deprecation = :log
  config.action_dispatch.best_standards_support = :builtin

  config.active_record.mass_assignment_sanitizer = :strict
  config.active_record.auto_explain_threshold_in_seconds = 0.5

  config.assets.compress = false
  config.assets.debug = true
end

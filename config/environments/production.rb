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

  config.cache_classes = true

  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  config.serve_static_assets = false

  config.assets.compress = true
  config.assets.compile = false
  config.assets.digest = true

  config.i18n.fallbacks = true

  config.active_support.deprecation = :notify
end

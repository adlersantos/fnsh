class AuthMailer < ActionMailer::Base
  default :from => 'adler@fnsh.it'

  def signup_email(user)
    mail(
      :to => user.email,
      :subject => 'Thanks for signing up to Fnsh!'
    )
  end
end

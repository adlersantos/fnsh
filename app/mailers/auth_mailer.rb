class AuthMailer < ActionMailer::Base
  default :from => 'Adler Santos <adler@fnsh.it>'

  def signup_email(user)
    mail(
      :to => user.email,
      :subject => 'You just signed up to Fnsh!'
    )
  end
end

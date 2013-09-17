class AuthMailer < ActionMailer::Base
  default :from => 'Adler Santos <adler.g.santos@gmail.com>'

  def signup_email(user)
    @recipient = user
    mail(
      :to => user.email,
      :subject => 'You just signed up to Fnsh!'
    )
  end
end

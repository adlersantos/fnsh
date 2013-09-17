class SessionsController < ApplicationController

  before_filter :redirect_logged_in_user, :only => [:new]

  def new
  end

  def create
    @user = User.find_by_email(params[:user][:email])

    if @user && @user.verify_password(params[:user][:password])
      login_user(@user)
      redirect_to root_url
    else
      flash[:errors] ||= []
      flash[:errors] << "Incorrect username or password"
      redirect_to new_session_path
    end
  end

  def destroy
    logout_user
    flash[:errors] ||= []
    flash[:errors] << "You have been successfully logged out"
    redirect_to new_session_path
  end
end

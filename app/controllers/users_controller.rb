class UsersController < ApplicationController

  before_filter :redirect_logged_in_user, :only => [:new]

  def create
    @user = User.new(params[:user])

    if @user.save
      login_user(@user)
      AuthMailer.signup_email(@user).deliver!
      redirect_to root_url
    else
      flash.now[:errors] ||= []
      flash.how[:errors] << @user.errors.full_messages.to_sentence
      render :new
    end
  end

  def new
    render :new
  end

  def update
    @user = current_user
    @user.update_attributes(params[:user])
    render nothing: true
  end
end

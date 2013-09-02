class UsersController < ApplicationController

  before_filter :redirect_logged_in_user, :only => [:new]

  def show
    @user = User.find(params[:id])
  end

  def new
    render :new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      login_user(@user)
      redirect_to root_url
    else
      flash.now[:errors] ||= []
      flash.how[:errors] << @user.errors.full_messages.to_sentence
      render :new
    end
  end
end

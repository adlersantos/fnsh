class ApplicationController < ActionController::Base
  protect_from_forgery

  include SessionsHelper

  def redirect_logged_in_user
    if logged_in?
      flash[:errors] ||= []
      flash[:errors] << "You are already logged in"
      redirect_to root_url
    end
  end
end

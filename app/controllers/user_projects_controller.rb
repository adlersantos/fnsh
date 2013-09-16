class UserProjectsController < ApplicationController
  def create
    @user = User.find_by_email(params[:email])

    @user_project = UserProject.new({ project_id: params[:project_id], user_id: @user.id })
    if @user_project.save
      respond_to do |format|
        format.html { render 'show.rabl' }
        format.json { render 'show.rabl' }
      end
    end
  end
end

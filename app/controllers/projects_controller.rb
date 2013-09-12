class ProjectsController < ApplicationController

  before_filter :authenticate_user, :only => [:index]

  def create
    ActiveRecord::Base.transaction do
      @project = Project.new(params[:project])

      if @project.save
        @user_project = UserProject.new(user_id: current_user.id,
                                        project_id: @project.id)
        @user_project.save
      else
        flash[:errors] ||= []
        flash[:errors] << "Something went wrong, please try again."
        render :back
      end
    end

    if @project.save
      respond_to do |format|
        format.html { render 'index.rabl' }
        format.json { render 'index.rabl' }
      end
    end
  end

  def destroy
    @project = Project.find(params[:id])
    user_project = UserProject.where("project_id = ? AND user_id = ?",
                                      @project.id,
                                      current_user.id).first
    user_project.destroy

    user_projects = UserProject.where("project_id = ?", @project.id)
    @project.destroy if user_projects.size == 0

    respond_to do |format|
      format.html { render 'index.rabl' }
      format.json { render 'index.rabl' }
    end
  end

  def index
    @user = current_user
    @projects = Project.all

    respond_to do |format|
      format.html { render 'index.rabl' }
      format.json { render 'index.rabl' }
    end
  end

  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html { render 'show.rabl' }
      format.json { render 'show.rabl' }
    end
  end

  def update
    @project = Project.find(params[:id])

    unless params[:added_username].blank?
      ActiveRecord::Base.transaction do
        @user = User.find_by_username(params[:added_username])

        if @user
          UserProject.create(project_id: @project.id, user_id: @user.id)
        else
          flash.now[:errors] ||= []
          flash.now[:errors] << "Username doesn't exist."
        end
      end
    end

    @project.update_attributes(params[:project])

    respond_to do |format|
      format.html { render 'show.rabl' }
      format.json { render 'show.rabl' }
    end
  end
end

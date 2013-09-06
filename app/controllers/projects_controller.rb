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
    @project.destroy

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

    unless params[:added_task].blank?
      ActiveRecord::Base.transaction do
        Task.create(name: params[:added_task],
                    task_list_id: params[:task_list_id],
                    finished: false)
      end
    end

    @project.update_attributes(params[:project])

    respond_to do |format|
      format.html { render 'show.rabl' }
      format.json { render 'show.rabl' }
    end
  end
end

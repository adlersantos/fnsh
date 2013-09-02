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
end

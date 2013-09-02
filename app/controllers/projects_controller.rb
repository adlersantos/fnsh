class ProjectsController < ApplicationController

  # before_filter :redirect_logged_in_user

  def create
    @project = Project.new(params[:project])

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

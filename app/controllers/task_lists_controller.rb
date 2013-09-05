class TaskListsController < ApplicationController
  def create
    @task_list = TaskList.new(params[:task_list])
    @task_list.project_id = params[:project_id]

    if @task_list.save
      respond_to do |format|
        format.html { render 'show.rabl' }
        format.json { render 'show.rabl' }
      end
    else
      flash[:errors] ||= []
      flash[:errors] << "Task list creation failed, please try again."
      render :back
    end
  end

  def destroy
    @task_list = TaskList.find(params[:id])

    @project = @task_list.project
    @task_list.destroy

    respond_to do |format|
      format.html { render 'projects/show.rabl' }
      format.json { render 'projects/show.rabl' }
    end
  end

  def index
    @task_lists = TaskList.all

    respond_to do |format|
      format.html { render 'index.rabl' }
      format.json { render 'index.rabl' }
    end
  end
end

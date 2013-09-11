class TaskListsController < ApplicationController
  def create
    @task_list = TaskList.new(params[:task_list])
    @task_list.project_id = params[:project_id]

    first_task_list = TaskList.where("project_id = ?", params[:project_id])
                              .order('position').first

    if first_task_list
      @task_list.position = first_task_list.position / 2.0
    else
      @task_list.position = 1
    end

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
    @task_lists = TaskList.where("project_id = ?", params[:project_id])
    @project_id = params[:project_id]

    respond_to do |format|
      format.html { render 'index.rabl' }
      format.json { render 'index.rabl' }
    end
  end

  def update
    @task_list = TaskList.find(params[:id])
    @task_list.update_attributes(params[:task_list])

    respond_to do |format|
      format.html { render 'show.rabl' }
      format.json { render 'show.rabl' }
    end
  end
end

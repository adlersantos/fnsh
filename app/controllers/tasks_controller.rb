class TasksController < ApplicationController
  def create
    @task = Task.new(params[:task])
    @task.finished = false
    @task.task_list_id = params[:task_list_id]

    if @task.save
      respond_to do |format|
        format.html { render 'show.rabl' }
        format.json { render 'show.rabl' }
      end
    else
      flash[:errors] ||= []
      flash[:errors] << "Task creation failed, please try again."
      render :back
    end
  end

  def destroy
    @task = Task.find(params[:id])
    @task.destroy

    @tasks = Task.all

    respond_to do |format|
      format.html { render 'index.rabl' }
      format.json { render 'index.rabl' }
    end
  end

  def index
    @tasks = Task.all.select{ |task| task.project != nil }
    respond_to do |format|
      format.html { render 'index.rabl' }
      format.json { render 'index.rabl' }
    end
  end

  def update
    @task = Task.find(params[:id])
    @task.update_attributes(params[:task])

    # @tasks = Task.all

    respond_to do |format|
      format.html { render 'show.rabl' }
      format.json { render 'show.rabl' }
    end
  end
end

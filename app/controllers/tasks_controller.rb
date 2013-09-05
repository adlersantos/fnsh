class TasksController < ApplicationController
  def create
    @task = Task.new(params[:task])
    @task.finished = false

    if @task.save
      respond_to do |format|
        format.html { render 'index.rabl' }
        format.json { render 'index.rabl' }
      end
    else
      flash[:errors] ||= []
      flash[:errors] << "Something went wrong, please try again."
      render :back
    end
  end
end

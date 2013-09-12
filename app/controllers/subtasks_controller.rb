class SubtasksController < ApplicationController
  def create
    @subtask = Subtask.new(params[:subtask])
    @subtask.finished = false
    @subtask.task_id = params[:task_id]

    if @subtask.save
      respond_to do |format|
        format.html { render 'show.rabl' }
        format.json { render 'show.rabl' }
      end
    else
      flash[:errors] ||= []
      flash[:errors] << "Subtask creation failed, please try again."
      render :back
    end
  end

  def destroy
    @subtask = Subtask.find(params[:id])
    @subtask.destroy

    @subtasks = Subtask.all

    respond_to do |format|
      format.html { render 'index.rabl' }
      format.json { render 'index.rabl' }
    end
  end

  def index
    @subtasks = Subtask.all
    respond_to do |format|
      format.html { render 'index.rabl' }
      format.json { render 'index.rabl' }
    end
  end

  def update
    @subtask = Subtask.find(params[:id])
    @subtask.update_attributes(params[:subtask])

    respond_to do |format|
      format.html { render 'show.rabl' }
      format.json { render 'show.rabl' }
    end
  end
end
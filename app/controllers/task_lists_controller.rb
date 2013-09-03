class TaskListsController < ApplicationController
  def destroy
    @task_list = TaskList.find(params[:id])

    @project = @task_list.project
    @task_list.destroy

    respond_to do |format|
      format.html { render 'projects/show.rabl' }
      format.json { render 'projects/show.rabl' }
    end
  end
end

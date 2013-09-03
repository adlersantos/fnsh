class TaskListsController < ApplicationController
  def create
    @task_list = TaskList.new(params[:task_list])
  end
end

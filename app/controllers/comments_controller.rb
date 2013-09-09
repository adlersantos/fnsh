class CommentsController < ApplicationController
  def create
    @comment = Comment.new(params[:comment])
    @comment.author_id = current_user.id

    if @comment.save
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
end

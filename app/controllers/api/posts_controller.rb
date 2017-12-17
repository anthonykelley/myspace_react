class Api::PostsController < ApplicationController
  
  def index
    render json: Post.all
  end

  def show
    render json: @post
  end

  private
  def set_post
    @menu = Post.find(params[:id])
  end

  def post_params
    params.require(:post).permit(:title, :body)      
  end
end

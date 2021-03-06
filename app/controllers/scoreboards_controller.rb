class ScoreboardsController < ApplicationController

  def create
    @scoreboard = Scoreboard.create!(name: "New Scoreboard", description: "Scoreboard Description")
    render json: @scoreboard
  end

  def update
    @scoreboard = Scoreboard.update(params[:id], scoreboard_params)
    render json: @scoreboard
  end

  def show
    @scoreboard = Scoreboard.find(params[:id])
    render json: @scoreboard
  end

  private
  def scoreboard_params
    params.require(:scoreboard).permit(:name, :description)
  end
end

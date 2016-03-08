class ScoreboardsController < ApplicationController

  def create
    @scoreboard = Scoreboard.create!(name: "Click to edit scoreboard name", description: "Click to edit scoreboard description")
    render json: @scoreboard
  end

  def update
    @scoreboard = Scoreboard.update(params[:id], scoreboard_params)
    render json: @scoreboard
  end

  private
  def scoreboard_params
    params.require(:scoreboard).permit(:name, :description)
  end
end

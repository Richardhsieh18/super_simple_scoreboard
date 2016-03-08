class ScoreboardsController < ApplicationController

  def create
    @scoreboard = Scoreboard.create!(name: "Click to enter scoreboard name", description: "Click to enter scoreboard description")
    render json: @scoreboard
  end

end

class PlayersController < ApplicationController
  before_filter :load_player, only: [:update, :destroy]

  def index
    @players = Player.all
    render json: @players
  end

  def create
    @player = Player.create!(player_params)
    render json: @player
  end

  def update
    @player.update(player_params)
    render json: @player
  end

  def destroy
    @player.destroy!
    render json: {success: true}
  end

  private
  def player_params
    params.require(:player).permit(:name, :score)
  end

  def load_player
    @player = Player.find(params[:id])
  end
end

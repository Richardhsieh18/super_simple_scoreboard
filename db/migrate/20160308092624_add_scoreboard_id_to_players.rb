class AddScoreboardIdToPlayers < ActiveRecord::Migration
  def change
    add_column :players, :scoreboard_id, :integer
  end
end

class CreateScoreboards < ActiveRecord::Migration
  def change
    create_table :scoreboards do |t|
      t.text :name
      t.string :description

      t.timestamps null: false
    end
  end
end

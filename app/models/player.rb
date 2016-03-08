class Player < ActiveRecord::Base
  belongs_to :scoreboard
  after_initialize :init

  private
  def init
    self.score ||= 0
  end
end

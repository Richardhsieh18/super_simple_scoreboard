class Player < ActiveRecord::Base
  after_initialize :init

  private
  def init
    self.score ||= 0
  end
end

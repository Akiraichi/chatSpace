class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true

  def show_last_message #メッセージが投稿されている場合、されていない場合で処理を分ける
    if (last_message = messages.last).present? #最新のメッセージを変数last_messageに代入
      last_message.content? ? last_message.content : '画像が投稿されています'
    else
      'まだメッセージはありません。'
    end
  end
end

class MessagesController < ApplicationController
  before_action :set_group
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user) #n+1問題を阻止するため
  end

  def create
    @message = @group.messages.new(message_params)
    #保存に成功した場合と失敗した場合とで処理を分ける
    if @message.save
      redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end


  private

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
  def set_group
    @group = Group.find(params[:group_id])
  end
end

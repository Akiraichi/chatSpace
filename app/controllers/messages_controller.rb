class MessagesController < ApplicationController
  before_action :set_group
  
  def index
    @message = Message.new
    @messages = @group.messages.includes(:user) #n+1問題を阻止するため
    respond_to do |format|
      format.html
      format.json { 
        if params[:id] != 'undefined'
          @new_messages = Message.where('id > ? and group_id = ?', params[:id],params[:group_id])
        end
      }
    end
  end

  def create
    @message = @group.messages.new(message_params)
    #保存に成功した場合と失敗した場合とで処理を分ける
    if @message.save
      respond_to do |format|
        format.html { redirect_to group_messages_path(@group), notice: 'メッセージが送信されました'  }
        format.json  #リクエストされたformatによって処理が分かれる
      end
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

class GroupsController < ApplicationController
  #グループの新規作成画面
  def index
  end
  def new
    @group = Group.new
    @group.users << current_user #現在ログイン中のユーザーを、新規作成したグループに追加
  end
  
  #グループの新規作成
  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new #renderはHTTPリクエストを送らず、該当するビューだけを表示
    end
  end
  def edit
  end
  def update
  end


  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end
end

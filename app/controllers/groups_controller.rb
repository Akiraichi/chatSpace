class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

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

  #editアクションがないが、ルーティングとルーティングに対応するビューさえあれば、明示的にコントローラのアクションを定義しなくても、ビューを表示することができるため、問題ない。

  def update
    if @group.update(group_params)#更新の可否にあわせて処理する
      redirect_to group_messages_path(@group), notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end
  def set_group
    @group = Group.find(params[:id])
  end
end

class UsersController < ApplicationController
  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").limit(20)
    respond_to do |format|
      format.html
      format.json
    end
  end
  
  def edit
  end

  def update
    if current_user.update(user_params) #updateできて保存てきた場合
      redirect_to root_path #root_pathへリダイレクトされる
    else
      render :edit  #（失敗した場合）eidtアクションを実行する（再描画する）
    end
  end

  private
  
  def user_params
    params.require(:user).permit(:name, :email)
  end

end
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  #before_action :authenticate_user!
  #before_action :configure_permitted_parameters, if: :devise_controller? #deviseにまつわる画面に行った時にということ

  protected#クラス内、同一パッケージ、サブクラスからアクセス可

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name])
  end
end

Rails.application.routes.draw do
  devise_for :users
  root 'messages#index'
  resoueces :users, only: [:edit, :update]
end

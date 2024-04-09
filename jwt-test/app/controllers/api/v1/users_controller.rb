class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: [:show, :destroy]

  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: user_params, status: :unprocessable_entity
    end 
  end 

  def index 
    @users = User.all
    render json: @users, status: :ok
  rescue => e
    render json: { error: "Error al obtener la lista de usuarios: #{e.message}" }, status: :unprocessable_entity
  end

  def show
    render json: @user, status: :ok
  rescue => e
    render json: { error: "Error al obtener el usuario: #{e.message}" }, status: :unprocessable_entity
  end

  def destroy
    begin
      @user.destroy
      render json: @user, status: :ok
    rescue => e
      render json: { error: "No se pudo eliminar el usuario: #{e.message}" }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find_by(id: params[:id])
    render json: { error: 'Usuario no encontrado' }, status: :not_found unless @user
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end
end

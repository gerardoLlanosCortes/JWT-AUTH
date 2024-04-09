class Api::V1::SessionsController < ApplicationController
    skip_before_action :authenticate_request, only: [:login, :refresh]
    
    def login 
        @user = User.find_by(username: params[:username])
      
        if @user && @user.password === params[:password]
          access_token = jwt_encode({ id: @user.id, username: @user.username, isAdmin: @user.isAdmin })
          refresh_token = jwt_encode_refresh_token({ id: @user.id, username: @user.username, isAdmin: @user.isAdmin })
          render json: {id: @user.id, username: @user.username, access_token: access_token, refresh_token: refresh_token}, status: :ok
        else
          render json: { msg: "Nombre de usuario o contraseña incorrectos" }, status: :unauthorized
        end
    end  

    def refresh
        refresh_token = params[:refresh_token]
        decoded_refresh_token = jwt_decode(refresh_token)
        
        if decoded_refresh_token
          user = User.find_by(id: decoded_refresh_token[:id])
          if user
            new_access_token = jwt_encode({ id: user.id, username: user.username, isAdmin: user.isAdmin })
            new_refresh_token = jwt_encode_refresh_token({ id: user.id, username: user.username, isAdmin: user.isAdmin })
            render json: { access_token: new_access_token, refresh_token: new_refresh_token }, status: :ok
          else
            render_unauthorized('Usuario no encontrado')
          end
        else
          render_unauthorized('Token de refresco inválido')
        end
      end
end
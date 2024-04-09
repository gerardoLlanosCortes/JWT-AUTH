class ApplicationController < ActionController::API
    include JwtHandler
    before_action :authenticate_request
  
    private
  
    def authenticate_request
      token = extract_token_from_headers
      if token
        @current_user = find_user_from_token(token)
        render_unauthorized('Token inválido') unless @current_user
      else
        render_unauthorized('Falta el token de autenticación')
      end
    end
  
    def extract_token_from_headers
      header = request.headers['Authorization']
      header.split(' ').last if header.present?
    end
  
    def find_user_from_token(token)
      decoded_token = jwt_decode(token)
      User.find_by(id: decoded_token[:id]) if decoded_token
    end
  
    def render_unauthorized(message)
      render json: { error: message }, status: :unauthorized
    end
  end
  
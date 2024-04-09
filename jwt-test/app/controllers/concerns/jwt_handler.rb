require "jwt"

module JwtHandler
  extend ActiveSupport::Concern

  SECRET_KEY = "mySecretKey"

    #Codificamos el jwt
  def jwt_encode(payload, expiration_time = 5.seconds.from_now)
    payload[:exp] = expiration_time.to_i
    JWT.encode(payload, SECRET_KEY)
  end

   # Codificamos el jwt para el token de refresco con expiración en 15 minutos
   def jwt_encode_refresh_token(payload)
    expiration_time = 10.seconds.from_now
    payload[:exp] = expiration_time.to_i
    JWT.encode(payload, SECRET_KEY)
  end

    #Decodificamos   
  def jwt_decode(token)
    begin
      decoded = JWT.decode(token, SECRET_KEY)[0]
      HashWithIndifferentAccess.new(decoded)
    rescue JWT::DecodeError => e
      Rails.logger.error("JWT decode error: #{e.message}")
      nil
    end
  end
end
class AgregarIsAdminAUsuario < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :isAdmin, :boolean
  end
end

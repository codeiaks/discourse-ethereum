# name: discourse-ethereum
# version: 0.2.0
# authors: Updated by Your Name
# url: https://github.com/yourusername/discourse-ethereum
# required_version: 2.7.0

enabled_site_setting :discourse_ethereum_enabled
register_asset "stylesheets/common.scss"
register_asset "stylesheets/mobile.scss", :mobile

after_initialize do
  # Register custom fields
  register_editable_user_custom_field("ethereum_address")
  
  # User serializer extension
  add_to_serializer(:user, :ethereum_address) do
    if SiteSetting.discourse_ethereum_enabled
      object.custom_fields["ethereum_address"].to_s.downcase
    end
  end
  
  # Add ethereum address to post serializer
  add_to_serializer(:post, :ethereum_address) do
    return nil if !SiteSetting.discourse_ethereum_enabled
    
    user = object.user
    user&.custom_fields&.dig("ethereum_address")&.to_s&.downcase
  end
  
  # Controller for handling message signatures
  class ::EthereumController < ::ApplicationController
    requires_plugin("discourse-ethereum")
    before_action :ensure_logged_in
    
    def verify_signature
      params.require([:message, :signature, :address])
      
      # For a real implementation, you would verify the signature here
      # This would validate that the user controls the wallet
      
      render json: success_json
    end
  end
  
  # Add routes
  Discourse::Application.routes.append do
    post "ethereum/verify" => "ethereum#verify_signature"
  end
end

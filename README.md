# Discourse Ethereum Plugin

A Discourse plugin that enables Ethereum wallet integration for forum users. This plugin allows users to connect their Ethereum wallets (like MetaMask) to their Discourse profiles, display their addresses, and sign messages to verify wallet ownership without spending gas.

## Features

- **Wallet Connection**: Users can connect their MetaMask or other Web3 wallets directly from their profile settings
- **Address Display**: Ethereum addresses are shown on user profiles and posts
- **Message Signing**: Support for cryptographic message signing for identity verification (gasless)
- **Etherscan Integration**: Automatic links to view addresses on the appropriate Etherscan explorer
- **Multi-Network Support**: Works with Ethereum Mainnet and testnets (Goerli, Rinkeby, etc.)

## Requirements

- Discourse v2.7.0 or higher
- Web3 wallet (MetaMask, Brave, etc.) for users who want to connect their wallets

## Installation

### Using the Admin Interface

1. Go to Admin > Settings > Plugins
2. Add a new repository with the following details:
   - Repository URL: `https://github.com/codeiaks/discourse-ethereum`
3. Click "Install"
4. Restart your Discourse instance

### Manual Installation

```bash
# Clone the repository
cd /var/discourse/plugins
git clone https://github.com/codeiaks/discourse-ethereum.git

# Rebuild the container
cd /var/discourse
./launcher rebuild app
```

## Configuration

1. Go to Admin > Settings > Plugins
2. Find and enable "discourse ethereum enabled"
3. Configure any other settings:
   - Add custom translation strings if needed

## Usage

### For Users

1. Go to your user preferences
2. Find the "Ethereum Address" field
3. Click "Connect Wallet" to connect your Web3 wallet (requires MetaMask or similar browser extension)
4. Your Ethereum address will now be displayed on your profile and posts

### Message Signing

To verify wallet ownership without spending gas:

1. Navigate to a user's profile
2. Click the "Sign Message" button if available
3. Confirm the message in your wallet
4. The signature can be used for verification purposes

## Customization

You can customize the plugin by:

1. Modifying `assets/stylesheets/common.scss` to change the appearance
2. Editing the message template in `modals/sign-message.js`
3. Adding additional network support in `eth-user.gjs`

## License

This plugin is open-source software licensed under the MIT license.

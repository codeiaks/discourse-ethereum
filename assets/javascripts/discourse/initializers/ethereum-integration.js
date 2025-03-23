import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "ethereum-integration",
  initialize(container) {
    withPluginApi("0.8.31", api => {
      // Add Ethereum address display to user cards
      api.includePostAttributes("ethereum_address");
      api.addPosterIcon(cfs => {
        const address = cfs.ethereum_address;
        if (address) {
          return {
            emoji: "link",
            className: "ethereum-address-icon",
            title: `Ethereum: ${address.slice(0, 10)}...${address.slice(37)}`
          };
        }
      });
      
      // Setup global wallet connection method
      window.connectWallet = async function() {
        try {
          if (window.ethereum) {
            const accounts = await window.ethereum.request({ 
              method: 'eth_requestAccounts' 
            });
            return accounts[0];
          } else {
            console.log("No Ethereum provider detected");
            return null;
          }
        } catch (error) {
          console.error("Error connecting to wallet:", error);
          return null;
        }
      };
      
      // Add signing method for gasless transactions
      window.signMessage = async function(message) {
        try {
          if (!window.ethereum) {
            throw new Error("No Ethereum wallet detected");
          }
          
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const account = accounts[0];
          
          // Convert message to hex
          const encodedMessage = `0x${Buffer.from(message).toString('hex')}`;
          
          // Request signature
          const signature = await window.ethereum.request({
            method: 'personal_sign',
            params: [encodedMessage, account]
          });
          
          return {
            account,
            message,
            signature
          };
        } catch (error) {
          console.error("Error signing message:", error);
          throw error;
        }
      };
    });
  }
};

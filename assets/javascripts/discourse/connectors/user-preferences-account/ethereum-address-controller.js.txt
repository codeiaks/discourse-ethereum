import { action } from "@ember/object";

export default {
  actions: {
    connectWallet() {
      try {
        // First, check if connectWallet function exists
        if (typeof window.connectWallet !== "function") {
          console.error("connectWallet function not found");
          return;
        }

        // Then attempt to connect
        window
          .connectWallet()
          .then((address) => {
            if (address) {
              this.set("model.custom_fields.ethereum_address", address);
              console.log("Wallet connected:", address);
            }
          })
          .catch((error) => {
            console.error("Failed to connect wallet:", error);
          });
      } catch (error) {
        console.error("Error in connectWallet action:", error);
      }

      // Explicitly prevent default action (page refresh)
      return false;
    },
  },
};

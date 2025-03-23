import { action } from "@ember/object";

export default {
  actions: {
    async connectWallet() {
      try {
        const address = await window.connectWallet();
        if (address) {
          this.set("model.custom_fields.ethereum_address", address);
        }
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  }
};

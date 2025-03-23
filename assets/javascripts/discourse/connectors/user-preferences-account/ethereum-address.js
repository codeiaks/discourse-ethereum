export default {
  setupComponent(args, component) {
    args.model.set(
      "custom_fields.ethereum_address",
      args.model.get("ethereum_address")
    );

    component.set("connectWallet", async function () {
      console.log("Connect wallet clicked");
      try {
        if (typeof window.connectWallet === "function") {
          const address = await window.connectWallet();
          if (address) {
            args.model.set("custom_fields.ethereum_address", address);
            console.log("Wallet connected:", address);
          }
        } else {
          console.error("window.connectWallet function not found");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
      return false;
    });
  },

  shouldRender(args, component) {
    return component.siteSettings.discourse_ethereum_enabled;
  },
};

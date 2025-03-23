export default {
  shouldRender(args, component) {
    return component.siteSettings.discourse_ethereum_enabled;
  },
  
  setupComponent(args, component) {
    args.model.set("custom_fields.ethereum_address", args.model.get("ethereum_address"));
  }
};

import Component from "@glimmer/component";
import { service } from "@ember/service";
import { linkTo } from "@ember/routing";
import UserAvatar from "discourse/components/user-avatar";

export default class EthUser extends Component {
  @service site;

  get avatarSize() {
    return this.site.mobileView ? "large" : "extra_large";
  }
  
  get etherscanURL() {
    const networkPrefix = this.getNetworkPrefix();
    if (!networkPrefix && networkPrefix !== "") return null;
    
    return `https://${networkPrefix}etherscan.io/address/${this.args.ethereumAddress}`;
  }
  
  get formatedEthereumAddress() {
    const addr = this.args.ethereumAddress;
    return addr.slice(0, 10) + "..." + addr.slice(37);
  }
  
  getNetworkPrefix() {
    const networkID = ethereum?.chainId ? parseInt(ethereum.chainId, 16) : "1";
    
    switch (networkID.toString()) {
      case "1": return "";
      case "3": return "ropsten.";
      case "4": return "rinkeby.";
      case "5": return "goerli.";
      case "42": return "kovan.";
      default: return null;
    }
  }
  
  <template>
    <linkTo @route="user.summary" @model={{@user.username}}>
      <UserAvatar @user={{@user}} @size={{this.avatarSize}} />
    </linkTo>
    
    <div class="eth-username">{{@user.username}}</div>
    <a href={{this.etherscanURL}} title={{@ethereumAddress}} target="_blank" class="eth-address">
      {{this.formatedEthereumAddress}}
    </a>
  </template>
}

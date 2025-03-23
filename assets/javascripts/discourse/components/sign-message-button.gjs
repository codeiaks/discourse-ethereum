import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import DButton from "discourse/components/d-button";
import showModal from "discourse/lib/show-modal";

export default class SignMessageButton extends Component {
  @service currentUser;
  @service siteSettings;
  
  get disabled() {
    return (
      typeof window.ethereum === "undefined" ||
      !window.ethereum.selectedAddress
    );
  }
  
  @action
  showSignMessageModal() {
    if (this.disabled) return;
    
    showModal("sign-message", { model: this.args.model });
  }
  
  <template>
    <DButton
      @class="btn-primary"
      @label="discourse_ethereum.sign_message_button"
      @action={{this.showSignMessageModal}}
      @disabled={{this.disabled}}
    />
  </template>
}

import Modal from "discourse/components/modal";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

export default class SignMessageModal extends Modal {
  @tracked message = "I confirm this is my wallet address for my Discourse account";
  @tracked signature = null;
  @tracked loading = false;
  @tracked error = null;
  
  @action
  async signMessage() {
    this.loading = true;
    this.error = null;
    this.signature = null;
    
    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum wallet detected");
      }
      
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      
      // Convert message to hex
      const encodedMessage = `0x${Buffer.from(this.message).toString('hex')}`;
      
      // Request signature
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [encodedMessage, account]
      });
      
      this.signature = signature;
      
      // Here you could save the signature to the server for verification
      // This is where you'd send the signature to your backend for a gasless tx
    } catch (error) {
      this.error = error.message || "Failed to sign message";
      console.error("Signing error:", error);
    } finally {
      this.loading = false;
    }
  }
}

import { EmbedPage } from "./embedPage";

export default function registerEmbedPage() {
  try {
    window.customElements.define("embed-page", EmbedPage);
  } catch (err) {
    console.error("Could not create webcomponent: ", err);
  }
}

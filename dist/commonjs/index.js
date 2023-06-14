"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const embedPage_1 = require("./embedPage");
function registerEmbedPage() {
    try {
        window.customElements.define("embed-page", embedPage_1.EmbedPage);
    }
    catch (err) {
        console.error("Could not create webcomponent: ", err);
    }
}
exports.default = registerEmbedPage;
//# sourceMappingURL=index.js.map
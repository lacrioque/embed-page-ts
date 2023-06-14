import { updateDom } from "./updateDom";
export class EmbedPage extends HTMLElement {
    skipSourceRefresh;
    static get observedAttributes() {
        return ["src"];
    }
    updateContent(newContentPromise) {
        if (!this.shadowRoot) {
            return;
        }
        this.shadowRoot.innerHTML = `
<style>.loader {border: 16px solid #f3f3f3;border-top: 16px solid #3498db;border-radius: 50%;width: 120px;height: 120px;animation: spin 2s linear infinite;} @keyframes spin {0% { transform: rotate(0deg); }100% { transform: rotate(360deg); }}</style>
<div style="height: 50vw; width: 90vw; margin: 4vw; display: flex; align-items: center; justify-content: center;">
  <div class="loader"></div> 
</div>
`;
        newContentPromise.then((content) => updateDom(this.shadowRoot, content));
    }
    getContent() {
        const contentPromise = fetch(this.getAttribute("src"), {
            credentials: "same-origin",
            redirect: "follow",
            mode: "same-origin",
            cache: "default",
        }).then((response) => response.text());
        this.updateContent(contentPromise);
    }
    getContentByForm(url, method, content) {
        this.skipSourceRefresh = true;
        this.setAttribute("src", url);
        const urlParams = new URLSearchParams([...content.entries()]);
        const urlObj = new URL(this.getAttribute("src"));
        urlParams.forEach((v, k) => {
            urlObj.searchParams.append(k, v);
        });
        const contentPromise = fetch(urlObj, {
            credentials: "same-origin",
            redirect: "follow",
            mode: "same-origin",
            cache: "default",
            method,
            body: content,
        })
            .then((response) => response.text());
        this.updateContent(contentPromise);
    }
    postForNewContentByForm(url, method, content) {
        this.skipSourceRefresh = true;
        this.setAttribute("src", url);
        const contentPromise = fetch(this.getAttribute("src"), {
            credentials: "same-origin",
            redirect: "follow",
            mode: "same-origin",
            cache: "default",
            method,
            body: new URLSearchParams([...content.entries()]),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
        })
            .then((response) => response.text());
        this.updateContent(contentPromise);
    }
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.addEventListener("click", (e) => {
            const href = e.target?.getAttribute("href");
            if (href) {
                this.setAttribute("src", href);
            }
        });
        shadowRoot.addEventListener("submit", (e) => {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const method = form.method || "GET";
            if (["POST", "PATCH", "PUT"].includes(method)) {
                this.postForNewContentByForm(form.target || this.getAttribute("src"), method, formData);
            }
            if (["GET", "DELETE"].includes(method)) {
                this.getContentByForm(form.target || this.getAttribute("src"), method, formData);
            }
        });
        this.skipSourceRefresh = false;
    }
    connectedCallback() {
        this.getContent();
    }
    attributeChangeCallback() {
        if (this.skipSourceRefresh === false)
            this.getContent();
        this.skipSourceRefresh = false;
    }
}
//# sourceMappingURL=embedPage.js.map
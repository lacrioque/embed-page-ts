export declare class EmbedPage extends HTMLElement {
    private skipSourceRefresh;
    static get observedAttributes(): string[];
    private updateContent;
    getContent(): void;
    getContentByForm(url: string, method: "GET" | "DELETE", content: FormData): void;
    postForNewContentByForm(url: string, method: "POST" | "PATCH" | "PUT", content: FormData): void;
    constructor();
    connectedCallback(): void;
    attributeChangeCallback(): void;
}

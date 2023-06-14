export function updateDom(dom: ShadowRoot, content: string) {
  const parser = new DOMParser();

  const doc = parser.parseFromString(content, "text/html");

  const docHead = doc.head;
  const docBody = doc.body;

  const headScripts = Array.from(doc.head.getElementsByTagName("script"));
  const headLinkTags = doc.head.getElementsByTagName("link");
  const headLinkStyles = Array.from(headLinkTags).filter(
    (el) => el.rel === "stylesheet"
  );
  const headStyles = Array.from(doc.head.getElementsByTagName("style"));

  const bodyScripts = Array.from(doc.body.getElementsByTagName("script"));
  const bodyStyles = Array.from(doc.body.getElementsByTagName("style"));

  removeScriptsAndStyles([
    ...headScripts,
    ...headLinkStyles,
    ...headStyles,
    ...bodyScripts,
    ...bodyStyles,
  ]);

  dom.innerHTML = "<html></html>";
  dom.firstChild?.appendChild(docHead);
  dom.firstChild?.appendChild(docBody);

  headScripts.forEach((el) => applyTo(docHead, el));
  headLinkStyles.forEach((el) => applyTo(docHead, el));
  headStyles.forEach((el) => applyTo(docHead, el));

  bodyScripts.forEach((el) => applyTo(docBody, el));
  bodyStyles.forEach((el) => applyTo(docBody, el));
}

function removeScriptsAndStyles(
  elementCollection: (HTMLScriptElement | HTMLStyleElement | HTMLLinkElement)[]
) {
  for (const element of elementCollection) {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
}

function applyTo(
  rootNode: HTMLHeadElement | HTMLBodyElement,
  el: HTMLScriptElement | HTMLStyleElement | HTMLLinkElement
) {
  rootNode.appendChild(el);
}

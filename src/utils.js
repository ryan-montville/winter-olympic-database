export function makeElement(elementType, elementId, elementClass, elementText) {
  const newElement = document.createElement(elementType);
  if (elementId) newElement.setAttribute('id', elementId);
  if (elementClass) {
    newElement.setAttribute('class', elementClass);
  }
  if (elementText) newElement.textContent = elementText;
  return newElement;
}

export function createLink(href, linkText, external) {
  const newLink = document.createElement("a");
  newLink.href = href;
  newLink.textContent = linkText;
  if (external) {
    newLink.target = "_blank";
  }
  return newLink;
}
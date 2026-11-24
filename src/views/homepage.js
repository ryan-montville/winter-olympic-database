import { makeElement } from "../utils.js";

export async function renderHomepage(container) {
    container.innerHTML = "";
    const temp = makeElement("p", null, null, "temp");
    container.append(temp);
}
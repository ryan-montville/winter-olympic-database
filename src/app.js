import { createLink, makeElement } from "./utils.js";

export async function initApp() {
    const header = document.querySelector("header");

    if (header) {
        const heading = makeElement("h1", null, null, "2026 Winter Olympic Database");
        const nav = makeElement("nav", null, null, null);
        const homeLink = createLink("/", "Home", false);
        const graphsLink = createLink("/graphs.html", "Graphs", false);
        const presentationLink = createLink("/presentation", "Presentation", true);
        const githubLink = createLink(
            "https://github.com/ryan-montville/winter-olympic-database",
            "GitHub Repo",
            true
        );

        nav.append(homeLink, graphsLink, presentationLink, githubLink);
        header.append(heading, nav);
    }

}
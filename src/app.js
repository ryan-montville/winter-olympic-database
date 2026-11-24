import { createLink, makeElement } from "./utils.js";
import { router } from "./router.js";
import { renderHomepage } from "./views/homepage.js";
import { renderGraphs } from "./views/graphs.js";

const appElement = document.querySelector("#app") || document.querySelector("app");

async function initApp() {
    const header = document.querySelector("header");

    if (header) {
        const heading = makeElement("h1", null, null, "2026 Winter Olympic Database");
        const nav = makeElement("nav", null, null, null);

        const homeLink = createLink("/", "Home", false);
        const graphsLink = createLink("/graphs", "Graphs", false);
        const presentationLink = createLink("/presentation", "Presentation", true);
        const githubLink = createLink(
            "https://github.com/ryan-montville/winter-olympic-database",
            "GitHub Repo",
            true
        );

        nav.append(homeLink, graphsLink, presentationLink, githubLink);
        header.append(heading, nav);
    }

    router.addRoute("/", () => {
        renderHomepage(appElement);
    });

    router.addRoute("/presentation", () => {
        // TODO: renderPresentation(appElement)
    });

    router.addRoute("/graphs", () => {
        renderGraphs(appElement);
    });

    router.init();
}

initApp();
import { initApp } from "./app.js";
import { loadCsv, makeElement } from "./utils.js";

const main = document.querySelector("main");

await initApp();
const athleteData = await loadCsv("https://raw.githubusercontent.com/ryan-montville/winter-olympic-database/refs/heads/main/datasets/athlete.csv");

const athleteList = athleteData.reduce((acc, currentAthlete) => {
    //{ athlete_id: 1, athlete_name: "AABREKK Ingrid Bergene", gender: "F", date_of_birth: "10/14/2002", country_code: "NOR" }
    const flagImg = document.createElement("img");
    flagImg.src = `https://flagsapi.com/${currentAthlete["country_code"]}/flat/64.png`;
    const athleteArticle = makeElement("article", currentAthlete["athlete_id"].toString(), null, null);
    const athleteH3 = makeElement("h3", null, null, currentAthlete["athlete_name"]);
    athleteArticle.append(flagImg, athleteH3);
    acc.append(athleteArticle);
    return acc;
}, makeElement("div", "athletes", null, null));

main.append(athleteList);
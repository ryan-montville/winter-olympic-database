import { initApp } from "./app.js";
import { loadCsv, makeElement } from "./utils.js";

const main = document.querySelector("main");

await initApp();
const athleteData = await loadCsv("https://raw.githubusercontent.com/ryan-montville/winter-olympic-database/refs/heads/main/datasets/athlete.csv");
const participatesInData = await loadCsv("https://raw.githubusercontent.com/ryan-montville/winter-olympic-database/refs/heads/main/datasets/participates_in.csv");
const eventsData = await loadCsv("https://raw.githubusercontent.com/ryan-montville/winter-olympic-database/refs/heads/main/datasets/event.csv");

//event_id,sport_id,event_name,gender_category,date,time,event_type,venue_id

function getEventName(eventId) {
    const eventResult = eventsData.find(event => event["event_id"] === eventId);
    if (eventResult) {
        return eventResult["event_name"];
    } else {
        return eventId;
    }
}

participatesInData.forEach(row => {
    //athlete_id,event_id,ranking
    const athleteId = row["athlete_id"];
    const eventId = row["event_id"]
    const ranking = row["ranking"];
    let athleteResult = athleteData.find(athlete => athlete["athlete_id"] === athleteId);
    if (athleteResult) {
        if (!athleteResult["hasMedals"]) athleteResult["hasMedals"] = false;
        if (!athleteResult["events"]) {
            athleteResult["events"] = [];
        }
        if (ranking) athleteResult["hasMedals"] = true;
        athleteResult.events.push({eventId: eventId, ranking: ranking});
    }
});

const medalists = athleteData.filter(athlete => athlete["hasMedals"]);
console.log(`total athletes: ${athleteData.length} | medalists: ${medalists.length}`);

const athleteList = athleteData.reduce((acc, currentAthlete) => {
    //{ athlete_id: 1, athlete_name: "AABREKK Ingrid Bergene", gender: "F", date_of_birth: "10/14/2002", country_code: "NOR" }
    const flagImg = document.createElement("img");
    flagImg.src = `https://flagsapi.com/${currentAthlete["country_code"]}/flat/64.png`;
    const athleteArticle = makeElement("article", currentAthlete["athlete_id"].toString(), null, null);
    const athleteH3 = makeElement("h3", null, null, currentAthlete["athlete_name"]);
    const athleteInfo = makeElement("section", null, null, null);
    const athleteStats = makeElement("p", null, null, `gender: ${currentAthlete["gender"]} | DOB: ${currentAthlete["date_of_birth"]}`);
    athleteInfo.append(athleteH3, athleteStats);
    if (currentAthlete["events"]) {
        const events = currentAthlete["events"].reduce((ecc, currentEvent) => {
            if (currentEvent["ranking"] === 1) {
                ecc.push(`🥇 ${getEventName(currentEvent["eventId"])}`);
            } else if (currentEvent["ranking"] === 2) {
                ecc.push(`🥈 ${getEventName(currentEvent["eventId"])}`);
            } else if (currentEvent["ranking"] === 3) {
                ecc.push(`🥉 ${getEventName(currentEvent["eventId"])}`);
            } else {
                let eventName = getEventName(currentEvent["eventId"]);
                if (eventName !== "To be defined") {
                    ecc.push(eventName);
                }
            }
            return ecc;
        }, []);
        athleteInfo.append(makeElement("p", null, null, events.join(" | ")));
    }
    athleteArticle.append(flagImg, athleteInfo);
    acc.append(athleteArticle);
    return acc;
}, makeElement("div", "athletes", null, null));

main.append(athleteList);
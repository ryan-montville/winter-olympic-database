const content = document.getElementById("content");
let slides = [];
let index = 0;
let isAnimating = false;
let messageOnScreen = true;

const IMG_PATH_BASE = "https://raw.githubusercontent.com/ryan-montville/winter-olympic-database/refs/heads/main/images/"

function updateSlide() {
    content.classList.add("fade");
    setTimeout(() => {
        content.innerHTML = "";
        content.appendChild(slides[index]);
        content.classList.remove("fade");
    }, 500);
}

const handleKeyDown = (e) => {
    if (messageOnScreen) {
        clearMessage();
    }
    if (isAnimating) return;

    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        isAnimating = true;

        if (e.key === "ArrowRight") {
            index = (index === slides.length - 1) ? 0 : index + 1;
        } else {
            index = (index === 0) ? slides.length - 1 : index - 1;
        }

        updateSlide();
        setTimeout(() => {
            isAnimating = false;
        }, 550);
    }
};

function createUL(bulletTextArray) {
    return bulletTextArray.reduce((acc, item) => {
        if (item[0] == "-") {
            let nestedItems = item.split("||");
            nestedItems[0] = nestedItems[0].slice(1);
            const nestedUL = createUL(nestedItems);
            acc.appendChild(nestedUL);
        } else {
            const li = document.createElement("li");
            li.textContent = item;
            acc.appendChild(li);
        }

        return acc;
    }, document.createElement("ul"));
}

function createButton(buttonText, buttonType, buttonId, buttonClass, icon) {
    const newButton = document.createElement("button");
    newButton.setAttribute("type", buttonType);
    newButton.setAttribute("id", buttonId);
    newButton.setAttribute("class", buttonClass);
    if (icon.length > 0) {
        const buttonIconSpan = document.createElement("span");
        buttonIconSpan.setAttribute("class", "material-symbols-outlined");
        const buttonIcon = document.createTextNode(icon);
        buttonIconSpan.appendChild(buttonIcon);
        newButton.appendChild(buttonIconSpan);
    }
    const buttonTextElm = document.createTextNode(buttonText);
    newButton.appendChild(buttonTextElm);
    return newButton;
}

function createMessage(message) {
    const messageWrapper = document.getElementById("main-message");
    const messageDiv = document.createElement("div");
    messageDiv.setAttribute("class", "info message");
    messageDiv.setAttribute("aria-live", "polite");
    const icon = document.createElement("span");
    icon.setAttribute("class", "material-symbols-outlined");
    const iconName = document.createTextNode("info");
    icon.appendChild(iconName);
    messageDiv.appendChild(icon);
    const messageText = document.createTextNode(message);
    messageDiv.appendChild(messageText);
    const closeButton = createButton("", "button", "closeButton", "", "close");
    closeButton.addEventListener("click", () => clearMessage());
    messageDiv.appendChild(closeButton);
    messageWrapper.appendChild(messageDiv);
}

function clearMessage() {
    const messageWrapper = document.getElementById("main-message");
    messageWrapper.innerHTML = "";
    messageOnScreen = false;
}

let slide1 = document.createElement("section");
slide1.style.backgroundImage = `url('${IMG_PATH_BASE}title.jpg')`;
slide1.style.backgroundSize = "cover";
slide1.style.backgroundPosition = "center";
slide1.style.backgroundRepeat = "no-repeat";
slide1.setAttribute("id", "slide1");
const slide1TitleH1 = document.createElement("h1");
slide1TitleH1.textContent = "Group Torchbearers";
slide1.appendChild(slide1TitleH1);
const members = document.createElement("p");
members.innerHTML = `
  HUGO GRANILLO<br>
  RYAN MONTVILLE<br>
  SALMANUDDIN TALHA MOHD
`;
members.setAttribute("class", "bottom-right");
members.style.fontSize = "40px";
members.style.textAlign = "right";
slide1.appendChild(members);
const photoCredit = document.createElement("p");
photoCredit.textContent = "Image credit: Alex Pantling/Getty Images";
photoCredit.setAttribute("class", "bottom-left grey-30");
slide1.appendChild(photoCredit);
slides.push(slide1);

let slide2 = document.createElement("section");
const slide2H2 = document.createElement("h2");
slide2H2.textContent = "Project Overview";
slide2.appendChild(slide2H2);
let textBox = document.createElement("div");
const textContainer = document.createElement("div");
textContainer.setAttribute("class", "text-box-container");
textBox.setAttribute("class", "text-box center");
const entities = document.createElement("p");
entities.textContent = "Entities:"
textBox.appendChild(entities);
const entUL = createUL(["Country, Athlete, Sport, Event, Venue, Coach, Team"]);
textBox.appendChild(entUL);
const relationships = document.createElement("p");
relationships.textContent = "Relationships:";
textBox.appendChild(relationships);
const relUL = createUL(["Country - Athlete", "Athlete - Team", "Athlete - Event", "Coach - Athlete", "Sport - Event - Venue"]);
textBox.appendChild(relUL);
const hr = document.createElement("hr");
textBox.appendChild(hr);
const twoCol = document.createElement("div");
twoCol.setAttribute("class", "two-col");
const numbersLeft = createUL(["93 Countries​", "2920 Athletes​", "16 Sports​", "116 Events"]);
twoCol.appendChild(numbersLeft);
const numbersRight = createUL(["15 Venues​", "50 Coaches​", "551 teams"]);
twoCol.appendChild(numbersRight);
textBox.appendChild(twoCol);
textContainer.appendChild(textBox);
slide2.appendChild(textContainer);
slides.push(slide2);
const source = document.createElement("p");
source.appendChild(document.createElement("br"));
source.appendChild(document.createElement("br"));
const sourceText = document.createElement("span");
sourceText.textContent = "Data collected from the ";
source.appendChild(sourceText);
const sourceLink = document.createElement("a");
sourceLink.href = "https://www.olympics.com/en/milano-cortina-2026";
sourceLink.textContent = "Olympic website";
sourceLink.target = "_blank";
source.appendChild(sourceLink);
textBox.appendChild(source);

const slide3 = document.createElement("section");
const slide3H2 = document.createElement("h2");
slide3H2.textContent = "ER Model";
slide3.appendChild(slide3H2);
const imgContainer = document.createElement("div");
imgContainer.setAttribute("class", "text-box-container");
const er = document.createElement("img");
er.src = `${IMG_PATH_BASE}er.png`;
er.setAttribute("class", "center fit");
imgContainer.appendChild(er);
slide3.appendChild(imgContainer);
slides.push(slide3);

const slide4 = document.createElement("section");
const slide4H2 = document.createElement("h2");
slide4H2.textContent = "Relational Model";
let textBoxRel = document.createElement("div");
const textContainerRel = document.createElement("div");
textContainerRel.setAttribute("class", "text-box-container");
textBoxRel.setAttribute("class", "text-box center");
textBoxRel.style.fontSize = "23px";
slide4.appendChild(slide4H2);
const relModUL = createUL([
    "Country (country_code, alpha_2, country_name, continent)",
    "Sport (sport_id, sport_name, description)​",
    "Venue (venue_id, venue_name, location, venue_type, capacity)​",
    "Event(event_id, event_name, event_time, event_date, event_type, gender_category, sport_id, venue_id)​",
    "-foreign key (sport_id) references Sport (sport_id)​||foreign key (venue_id) references Venue (venue_id)​",
    "Athlete (athlete_id, athlete_name, gender, date_of_birth, country_code)​",
    "-foreign key (country_code) references Country (country_code)​",
    "Team (team_id, gender_category, num_of_athletes)​",
    "Team_Member (athlete_id, team_id)",
    "-foreign key (athlete_id) references Athlete (athlete_id) ​||foreign key (team_id) references Team (team_id)​",
    "Coach (coach_id, coach_name, specialty)​",
    "Trains (coach_id, athlete_id, year) -foreign key (coach_id) references coach (coach_id)",
    "-foreign key (athlete_id) references Athlete (athlete_id)​",
    "Participates_In (athlete_id, event_id, ranking)",
    "-foreign key (athlete_id) references Athlete (athlete_id)||foreign key (event_id) references Event (event_id)​",
    "Competes_In (team_id, event_id, ranking)",
    "-foreign key (team_id) references Team (team_id)||foreign key (event_id) references Event (event_id)"
]);
textBoxRel.appendChild(relModUL)
textContainerRel.appendChild(textBoxRel);
slide4.appendChild(textContainerRel);
slides.push(slide4);

const slide5 = document.createElement("section");
const slide5H2 = document.createElement("h2");
slide5H2.textContent = "SQL Query";
slide5.appendChild(slide5H2);
const textContainer5 = document.createElement("div");
textContainer5.setAttribute("class", "text-box-container");
const twoColSlide5 = document.createElement("div");
twoColSlide5.setAttribute("class", "two-col");
let textBox5 = document.createElement("div");
textBox5.setAttribute("class", "text-box center");
const queryUL = createUL([
    "This query shows the top performing countries based on the number  of medals and unique athletes who won them for their respective countries, i.e. one athlete is counted only once.",
    "This query connects three tables - Country, Athlete, amd Participates_In using correlated subqueries to count gold, silver, and bronze medals also the unique athletes seperately for each country.",
    "WHERE - Only include athletes, whose country matches the current country we are counting for.",
    "It is ordered by unique_medalists so the unique athlete who won the highest medals in shown first.",
    "Finally, it sorts countries by unique medallists and shows the top 15 results."
]);
textBox5.appendChild(queryUL);
textBox5.style.width = "40%";
twoColSlide5.appendChild(textBox5);
const sqlQ = document.createElement("img");
sqlQ.src = `${IMG_PATH_BASE}sql-query.png`;
sqlQ.style.width = "40%";
sqlQ.style.height = "auto";
twoColSlide5.appendChild(sqlQ);
textContainer5.appendChild(twoColSlide5);
slide5.appendChild(textContainer5);
slides.push(slide5);

const slide6 = document.createElement("section");
const slide6H2 = document.createElement("h2");
slide6H2.textContent = "SQL Query Result";
slide6.appendChild(slide6H2);
const imgContainer6 = document.createElement("div");
imgContainer6.setAttribute("class", "text-box-container");
const sqlr = document.createElement("img");
sqlr.src = `${IMG_PATH_BASE}sql-result.png`;
sqlr.setAttribute("class", "center fit");
imgContainer6.appendChild(sqlr);
slide6.appendChild(imgContainer6);
slides.push(slide6);

const slide7 = document.createElement("section");
const slide7H2 = document.createElement("h2");
slide7H2.textContent = "Ryan Montville - M:N";
slide7.appendChild(slide7H2);
const imgContainer7 = document.createElement("div");
imgContainer7.setAttribute("class", "text-box-container");
const q1c = document.createElement("img");
q1c.src = `${IMG_PATH_BASE}q1c.png`;
q1c.setAttribute("class", "center fit");
imgContainer7.appendChild(q1c);
slide7.appendChild(imgContainer7);
slides.push(slide7);

const slide8 = document.createElement("section");
const slide8H2 = document.createElement("h2");
slide8H2.textContent = "Ryan Montville - M:N";
slide8.appendChild(slide8H2);
const imgContainer8 = document.createElement("div");
imgContainer8.setAttribute("class", "text-box-container");
const twoCol8 = document.createElement("div");
twoCol8.setAttribute("class", "two-col");
const q1ia = document.createElement("img");
q1ia.src = `${IMG_PATH_BASE}q1ia.png`;
q1ia.setAttribute("class", "center fit");
twoCol8.appendChild(q1ia);
const q1ib = document.createElement("img");
q1ib.src = `${IMG_PATH_BASE}q1ib.png`;
q1ib.setAttribute("class", "center fit");
twoCol8.appendChild(q1ib);
imgContainer8.appendChild(twoCol8);
slide8.appendChild(imgContainer8);
slides.push(slide8);

const slide9 = document.createElement("section");
const slide9H2 = document.createElement("h2");
slide9H2.textContent = "Ryan Montville - M:N";
slide9.appendChild(slide9H2);
const imgContainer9 = document.createElement("div");
imgContainer9.setAttribute("class", "text-box-container");
const img9left = document.createElement("img");
img9left.src = `${IMG_PATH_BASE}q1q.png`;
img9left.classList.add("right");
img9left.style.height = "45vh";
img9left.style.width = "auto";
imgContainer9.appendChild(img9left);
const img9right = document.createElement("img");
img9right.src = `${IMG_PATH_BASE}q1r.png`;
img9right.classList.add("left");
img9right.style.height = "45vh";
img9right.style.width = "auto";
imgContainer9.appendChild(img9right);
slide9.appendChild(imgContainer9);
slides.push(slide9);

const slide10 = document.createElement("section");
const slide10H2 = document.createElement("h2");
slide10H2.textContent = "Salmanuddin Talha Mohd - 1:N";
slide10.appendChild(slide10H2);
const imgContainer10 = document.createElement("div");
imgContainer10.setAttribute("class", "text-box-container");
const q2c = document.createElement("img");
q2c.src = `${IMG_PATH_BASE}q2c.png`;
q2c.setAttribute("class", "center fit");
imgContainer10.appendChild(q2c);
slide10.appendChild(imgContainer10);
slides.push(slide10);

const slide11 = document.createElement("section");
const slide11H2 = document.createElement("h2");
slide11H2.textContent = "Salmanuddin Talha Mohd - 1:N";
slide11.appendChild(slide11H2);
const imgContainer11 = document.createElement("div");
imgContainer11.setAttribute("class", "text-box-container");
const q2i = document.createElement("img");
q2i.src = `${IMG_PATH_BASE}q2i.png`;
q2i.setAttribute("class", "center fit");
imgContainer11.appendChild(q2i);
slide11.appendChild(imgContainer11);
slides.push(slide11);

const slide12 = document.createElement("section");
const slide12H2 = document.createElement("h2");
slide12H2.textContent = "Salmanuddin Talha Mohd - 1:N";
slide12.appendChild(slide12H2);
const imgContainer12 = document.createElement("div");
imgContainer12.setAttribute("class", "text-box-container");
const img12left = document.createElement("img");
img12left.src = `${IMG_PATH_BASE}q2q.png`;
img12left.classList.add("right");
img12left.style.height = "45vh";
img12left.style.width = "auto";
imgContainer12.appendChild(img12left);
const img12right = document.createElement("img");
img12right.src = `${IMG_PATH_BASE}q2r.png`;
img12right.classList.add("left");
img12right.style.height = "45vh";
img12right.style.width = "auto";
imgContainer12.appendChild(img12right);
slide12.appendChild(imgContainer12);
slides.push(slide12);

const slide13 = document.createElement("section");
const slide13H2 = document.createElement("h2");
slide13H2.textContent = "Hugo Granillo - 1:N";
slide13.appendChild(slide13H2);
const imgContainer13 = document.createElement("div");
imgContainer13.setAttribute("class", "text-box-container");
const q3c = document.createElement("img");
q3c.src = `${IMG_PATH_BASE}q3c.png`;
q3c.setAttribute("class", "center fit");
imgContainer13.appendChild(q3c);
slide13.appendChild(imgContainer13);
slides.push(slide13);

const slide14 = document.createElement("section");
const slide14H2 = document.createElement("h2");
slide14H2.textContent = "Hugo Granillo - 1:N";
slide14.appendChild(slide14H2);
const imgContainer14 = document.createElement("div");
imgContainer14.setAttribute("class", "text-box-container");
const q3i = document.createElement("img");
q3i.src = `${IMG_PATH_BASE}q3i.png`;
q3i.setAttribute("class", "center fit");
imgContainer14.appendChild(q3i);
slide14.appendChild(imgContainer14);
slides.push(slide14);

const slide15 = document.createElement("section");
const slide15H2 = document.createElement("h2");
slide15H2.textContent = "Hugo Granillo - 1:N";
slide15.appendChild(slide15H2);
const imgContainer15 = document.createElement("div");
imgContainer15.setAttribute("class", "text-box-container");
const img15left = document.createElement("img");
img15left.src = `${IMG_PATH_BASE}q3q.png`;
img15left.classList.add("right");
img15left.style.height = "45vh";
img15left.style.width = "auto";
imgContainer15.appendChild(img15left);
const img15right = document.createElement("img");
img15right.src = `${IMG_PATH_BASE}q3r.png`;
img15right.classList.add("left");
img15right.style.height = "45vh";
img15right.style.width = "auto";
imgContainer15.appendChild(img15right);
slide15.appendChild(imgContainer15);
slides.push(slide15);

updateSlide();

document.addEventListener("keydown", handleKeyDown);

createMessage("Use arrow keys to change slides");
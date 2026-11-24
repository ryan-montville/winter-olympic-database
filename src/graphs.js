var goldDOB = [
    { year: 1982, count: 1 },
    { year: 1983, count: 1 },
    { year: 1984, count: 1 },
    { year: 1985, count: 2 },
    { year: 1986, count: 1 },
    { year: 1987, count: 2 },
    { year: 1988, count: 2 },
    { year: 1989, count: 5 },
    { year: 1990, count: 7 },
    { year: 1991, count: 6 },
    { year: 1992, count: 6 },
    { year: 1993, count: 9 },
    { year: 1994, count: 16 },
    { year: 1995, count: 14 },
    { year: 1996, count: 11 },
    { year: 1997, count: 17 },
    { year: 1998, count: 15 },
    { year: 1999, count: 14 },
    { year: 2000, count: 18 },
    { year: 2001, count: 15 },
    { year: 2002, count: 12 },
    { year: 2003, count: 8 },
    { year: 2004, count: 13 },
    { year: 2005, count: 4 },
    { year: 2006, count: 3 },
    { year: 2007, count: 1 },
    { year: 2008, count: 1 }
];

var silverDOB = [
    { year: 1979, count: 1 },
    { year: 1987, count: 1 },
    { year: 1988, count: 3 },
    { year: 1989, count: 5 },
    { year: 1990, count: 8 },
    { year: 1991, count: 7 },
    { year: 1992, count: 12 },
    { year: 1993, count: 6 },
    { year: 1994, count: 17 },
    { year: 1995, count: 16 },
    { year: 1996, count: 12 },
    { year: 1997, count: 17 },
    { year: 1998, count: 16 },
    { year: 1999, count: 15 },
    { year: 2000, count: 21 },
    { year: 2001, count: 20 },
    { year: 2002, count: 12 },
    { year: 2003, count: 9 },
    { year: 2004, count: 3 },
    { year: 2005, count: 6 },
    { year: 2006, count: 3 },
    { year: 2007, count: 2 }
];

var bronzeDOB = [
    { year: 1980, count: 1 },
    { year: 1982, count: 1 },
    { year: 1985, count: 1 },
    { year: 1986, count: 3 },
    { year: 1987, count: 2 },
    { year: 1988, count: 2 },
    { year: 1989, count: 5 },
    { year: 1990, count: 4 },
    { year: 1991, count: 8 },
    { year: 1992, count: 11 },
    { year: 1993, count: 8 },
    { year: 1994, count: 18 },
    { year: 1995, count: 15 },
    { year: 1996, count: 15 },
    { year: 1997, count: 13 },
    { year: 1998, count: 6 },
    { year: 1999, count: 14 },
    { year: 2000, count: 8 },
    { year: 2001, count: 18 },
    { year: 2002, count: 7 },
    { year: 2003, count: 14 },
    { year: 2004, count: 9 },
    { year: 2005, count: 7 },
    { year: 2006, count: 3 },
    { year: 2007, count: 3 },
    { year: 2008, count: 3 }
]

const sportsAgeGap = [
    { sportName: "Snowboard", youngest: 15, oldest: 53, ageGap: 37 },
    { sportName: "Curling", youngest: 19, oldest: 55, ageGap: 35 },
    { sportName: "Alpine Skiing", youngest: 17, oldest: 47, ageGap: 30 },
    { sportName: "Cross-Country Skiing", youngest: 17, oldest: 47, ageGap: 30 },
    { sportName: "Freestyle Skiing", youngest: 16, oldest: 46, ageGap: 29 },
    { sportName: "Bobsleigh", youngest: 19, oldest: 47, ageGap: 28 },
    { sportName: "Biathlon", youngest: 17, oldest: 43, ageGap: 26 },
    { sportName: "Luge", youngest: 19, oldest: 45, ageGap: 26 },
    { sportName: "Speed Skating", youngest: 18, oldest: 43, ageGap: 24 },
    { sportName: "Figure Skating", youngest: 18, oldest: 43, ageGap: 24 },
    { sportName: "Ice Hockey", youngest: 17, oldest: 41, ageGap: 23 },
    { sportName: "Skeleton", youngest: 18, oldest: 42, ageGap: 23 },
    { sportName: "Nordic Combined", youngest: 16, oldest: 38, ageGap: 21 },
    { sportName: "Ski Mountaineering", youngest: 20, oldest: 41, ageGap: 21 },
    { sportName: "Ski Jumping", youngest: 17, oldest: 39, ageGap: 21 },
    { sportName: "Short Track Speed Skating", youngest: 18, oldest: 36, ageGap: 17 }
]

var margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
    .attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")

var y = d3.scaleLinear()
    .range([height, 0]);
var yAxis = svg.append("g")
    .attr("class", "myYaxis")

function update(data) {
    x.domain(data.map(function (d) { return d.year; }));
    xAxis.transition().duration(1000).call(d3.axisBottom(x));
    y.domain([0, d3.max(data, function (d) { return d.count; })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));
    var u = svg.selectAll("rect")
        .data(data, function (d) { return d.year; });

    u.exit()
        .transition()
        .duration(1000)
        .attr("y", height)
        .attr("height", 0)
        .remove();

    var uEnter = u.enter()
        .append("rect")
        .attr("x", function (d) { return x(d.year); })
        .attr("width", x.bandwidth())
        .attr("y", height)
        .attr("height", 0)

    uEnter.merge(u)
        .transition()
        .duration(1000)
        .attr("x", function (d) { return x(d.year); })
        .attr("y", function (d) { return y(d.count); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.count); });
}

update(goldDOB);
const goldBOBButton = document.getElementById("gold-dob-button");
goldBOBButton.addEventListener("click", () => update(goldDOB))
const silverDOBButton = document.getElementById("silver-dob-button");
silverDOBButton.addEventListener("click", () => update(silverDOB));
const bronzeDOBButton = document.getElementById("bronze-dob-button");
bronzeDOBButton.addEventListener("click", () => update(bronzeDOB));
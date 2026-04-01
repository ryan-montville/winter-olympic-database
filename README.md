# 2026 Winter Olympic Database

### Group Members	 
* Hugo Granillo
* Ryan Montville
* Salmanuddin Talha Mohd

## Table of Contents
1) [Introduction](#intro)
2) [Description of the Organization](#description)
3) [ER Diagram](#erd)
4) [ER Diagram Uncaptured Constraints](uncaptured)
5) [Relational Schema with Referential Integrity](#schema)
6) [Relational Table Details](#rtd)
7) [Data collection](#ptc)
8) [Individual Non-trivial Queries](#intq)

<a id="intro"></a>

## Introduction
For this project, we chose to design a database management system for the Olympic Games. This is not based on
a real organization we contacted, but rather a conceptual application domain that our team selected because of its
complexity and real-world relevance.

The Winter Olympic Games are one of the largest and most complex sporting events in the world. Every four
years, thousands of athletes from over 200 countries compete across dozens of sports and hundreds of individual
events. Managing all of this requires organizing enormous amounts of data such as athlete profiles, team rosters,
coaching staff, event schedules, venue assignments, and competition results.

This database is designed to handle all these requirements in a structured, logical way. While we do not have an
actual contact person from an Olympic organization, we approached the design from the perspective of what a
database administrator responsible for managing Olympic data would need: accurate tracking of participants,
events, and results; support for both individual and team competitions; and a structure that ensures medal counts
align with official Olympic rankings.

<a id="description"></a>

## Description of the Organization
The Olympic Competition Database (OLYMPICS_DB) stores relevant information regarding the management of
international sporting events and competitions. The database tracks participating countries, athletes, coaches,
sports, teams, venues, and events. It also records athlete and team participation in events, coaching assignments,
and medal awards.

I. Countries participate in the Olympic Games by sending athletes, coaches, and teams to compete. Each Country
possesses a unique country code (country_code), a two-letter alpha-2 code (alpha_2), a full country name
(country_name), and the continent to which it belongs (continent). A country may have zero to many athletes,
and an athlete must represent exactly one country. A country may field zero to many teams, and a team must
belong to exactly one country. A country may have zero to many coaches affiliated with it, and a coach must be
affiliated with exactly one country.

II. Athletes are the individual competitors who participate in Olympic events. Each Athlete is identified by a
unique athlete identification number (athlete_id) and has an athlete name (athlete_name), gender, date of birth
(date_of_birth), and country code (country_code) indicating which country the athlete represents. An athlete
must participate in at least one event, and an event must have at least two athletes participating. An athlete may
be trained by zero to many coaches, and a coach must train at least one athlete. An athlete may be a member of
zero to many teams, and a team must have at least one athlete.

III. Teams are groups of athletes who compete together in team-based events. Each Team has a unique team
identification number (team_id), a country code (country_code) indicating which country fields the team and is
associated with a specific gender category (gender_category). Teams have a derived attribute called
(num_of_athletes), which is computed by counting the number of athletes in the Team_Member relationship. A
team must compete in at least one event, and an event must have at least two teams competing.

IV. Coaches are responsible for training athletes in preparation for competition. Each Coach has a unique coach
identification number (coach_id), a coach name (coach_name), a specialty area (specialty) indicating their area of
expertise and a country code (country_code) indicating which country the coach is affiliated with. The trains
relationship between coach and athlete includes a year attribute that records the year of the coaching relationship.

V. Sports represent the various athletic disciplines featured in the Olympic Games. Each Sport is identified by a
unique sport identification number (sport_id) and has a sport name (sport_name) and a detailed description of the
sport (description). A sport must have at least one event, and an event must belong to exactly one sport. Many
sports, such as swimming, biathlon, and track and field, include both individual and team events.

VI. Venues are the physical locations where Olympic events take place. Each Venue is identified by a unique
venue identification number (venue_id) and includes a venue name (venue_name), location address (location),
venue type (venue_type) indicating whether it is Indoor or Outdoor, and maximum capacity (capacity). A venue
may host zero to many events, and an event must be held at exactly one venue.

VII. Events are the individual competitions that take place during the Olympic Games. Each Event has a unique
event identification number (event_id), an event name (event_name), an event time (event_time), an event date
(event_date), an event type (event_type) 
designating Individual or Team competition, a gender category (gender_category) for Men, Women, or Mixed, a
sport identification number (sport_id) indicating which sport the event belongs to, and a venue identification
number (venue_id) indicating where the event is held. An event must have at least two participants (either
athletes or teams) to constitute a valid competition.

VIII. Participates_In is a relationship table that tracks which athletes compete in which individual events. An
athlete must participate in at least one event, and an event must have at least two athletes participating. This table
includes a ranking attribute to record the athlete's finishing position (1=Gold, 2=Silver, 3=Bronze).

IX. Trains is a relationship table that connects coaches to the athletes they train. A coach must train at least one
athlete, and an athlete may be trained by zero or many coaches. This table includes a year attribute to track when
the coaching relationship exists.

X. Team_Member is a relationship table that identifies which athletes are members of which teams. A team
must have at least one athlete, and an athlete may be a member of zero or many teams. Athletes in individual
sports are not members of any team. These are the specific rosters for teams competing in events, distinct from
the general country affiliation.

XI. Competes_In is a relationship table that tracks which teams compete in which team-based events. A team
must compete in at least one event, and an event must have at least two teams competing. This table includes a
ranking attribute to record the team's finishing position.

<a id="erd"></a>

## ER Diagram
![ER Diagram](erd.svg)

<a id="uncaptured"></a>

## ER Diagram Uncaptured Constraints
* Ranking must be between 1st and 3rd or null to correspond with gold, silver, and bronze medals awarded.
* Venue capacity must be a positive integer.
* The event_date must be within the start of the Olympics (February 6,2026) and the end of the Olympics (February
22, 2026).
* A venue cannot host more than one event with overlapping event_time.
*  Athlete date_of_birth must be after March 31st, 2013, since the youngest an athlete can be is 13. (referenced from
[Britannica](https://www.britannica.com/sports/Is-There-an-Age-Limit-for-the-Olympics))
<a id="schema"></a>

## Relational Schema with Referential Integrity
This section provides the relational schema with referential integrity and the relational table details.

Country (country_code, alpha_2, country_name, continent)

Team (team_id, gender_category, num_of_athletes)

Sport (sport_id, sport_name, description)

Venue (venue_id, venue_name, location, venue_type, capacity)

Event(event_id, event_name, event_time, event_date, event_type, gender_category, sport_id,
venue_id)
- foreign key (sport_id) references Sport (sport_id)
- foreign key (venue_id) references Venue (venue_id)

Coach (coach_id, coach_name, specialty)

Athlete (athlete_id, athlete_name, gender, date_of_birth, country_code)
-foreign key (country_code) references Country (country_code)

Trains (coach_id, athlete_id, year)
-foreign key (coach_id) references coach (coach_id)
-foreign key (athlete_id) references Athlete (athlete_id)

Participates_In (athlete_id, event_id, ranking)
-foreign key (athlete_id) references Athlete (athlete_id)
-foreign key (event_id) references Event (event_id)

Competes_In (team_id, event_id, ranking)
-foreign key (team_id) references Team (team_id)
-foreign key (event_id) references Event (event_id)

Team_Member (athlete_id, team_id)
-foreign key (athlete_id) references Athlete (athlete_id)
-foreign key (team_id) references Team (team_id)

<a id="rtd"></a>

## Relational Table Details
The relational schema given in Section 5 was mapped into the following tables in the OLYMPICS_DB database.
Primary keys have been underlined. Tables that have multiple attributes underlined represent composite keys.

| NAME | ATTRIBUTES | DESCRIPTION |
|---|---|---|
|Country | country_code<br>alpha_2<br>country_name<br>continent | Unique country code<br> Two-letter country code<br> Name of the country<br>Continent where country is located |
| Team | team_id<br>gender_category<br>num_of_althelets | Unique team ID<br>gender category of team (Men, Women, Mixed)<br>Count of the athletes |
| Sport | sport_id<br>sport_name<br>description | Unique sport ID<br>Name of the sport<br>Description of the sport |
|Venue|venue_id<br>venue_name<br>location<br>venue_type<br>capacity | Unique venue ID<br>Name of the venue<br>Location/address of the venue<br>Type of venue (Indoor, Outdoor)<br>Maximum capacity of the venue |
| Event | event_id<br>event_name<br>event_time<br>event_date<br>event_type<br>gender_category<br>sport_id<br>venue_id | Unique event ID<br>Name of the event<br>Time when the event takes place<br>Date when the event takes place<br>Type of event (Individual, Team)<br>Gender category (Men, Women, Mixed)<br>Unique ID of sport this event belongs to<br>Unique ID of venue where event is held |
| Coach |coach_id<br>coach_name<br>specialty | Unique coach ID<br>Name of the coach<br>Coaching speciality area |
| Athlete | athlete_id<br>athlete_name<br>gender<br>date_of_birth<br>country_code | Unique athlete ID<br>Name of the athlete<br>Gender of the athlete<br>Birth date of the athlete<br>Unique ID of country athlete represents |
| Trains | coach_id<br>athlete_id<br>year |  Unique ID of coach training the athlete<br>Unique ID of athlete being trained<br>year of training relationship |
| Participates_In | athlete_id<br>event_id<br>ranking | Unique ID of athlete participating in event<br>Unique ID of event athlete is participating in<br>Ranking/position of athlete in event |
| Competes_In | team_id<br>event_id<br>ranking | Unique ID of team competing in event<br>Unique ID of event team is competing in<br>Ranking/position of team in event |
| Team_Member | athlete_id<br>team_id | Unique ID of athlete who is member of team<br>Unique ID of team athlete belongs to |


<a id="ptc"></a>

## Data Collection
To gather the data for our database we used python to webscrape and clean the data from the [official Olympic website](https://www.olympics.com/en/milano-cortina-2026/schedule). You can view our python code [here](https://github.com/ryan-montville/winter-olympic-database/tree/main/python). You can view the resulting csv files [here](https://github.com/ryan-montville/winter-olympic-database/tree/main/datasets). You can view our formal DDL/DML sql code used to create the database [here](https://github.com/ryan-montville/winter-olympic-database/tree/main/sql).

<a id="intq"></a>

## Individual Non-trivial Queries
We were each tasked with writing a non-trivial query for our database

### Query 1: Top Performing Countries by Medal Count and Unique Medalists
**Output Schema**: country_code, country_name, continent, gold_medals, unique_medalist
<br>**Query Description**:
* This query identifies the top-performing countries in terms of both total medal counts and the diversity of their
medal-winning athletes.
* This query connects three tables - Country, Athlete and Participates_In using correlated subqueries to count gold,
silver and bronze medals separately for each country
* Uses four subqueries in the SELECT to calculate gold medals (ranking = 1), silver medals (ranking = 2), bronze
medals (ranking = 3) and unique medalists (COUNT DISTINCT) per country
* The HAVING clause only shows countries where the number of unique medal winning athletes is more than 5
ensuring only strong performing countries appear in the results
* Results are ordered by unique medalists DESC so countries with the most different athletes winning medals appear
first and limited to top 15 countries
* The final results are sorted by unique medalists in descending order and capped at 15 countries, ensuring the output
highlights nations with the strongest and most well-rounded athletic performances.
```SELECT c.country_code, c.country_name, c.continent,
(SELECT COUNT(p1_gold.ranking)
FROM Participates_In p1_gold
JOIN Athlete a1_gold ON p1_gold.athlete_id = a1_gold.athlete_id
WHERE a1_gold.country_code = c.country_code
AND p1_gold.ranking = 1) AS gold_medals,
(SELECT COUNT(p2_silver.ranking)
FROM Participates_In p2_silver
JOIN Athlete a2_silver ON p2_silver.athlete_id = a2_silver.athlete_id
WHERE a2_silver.country_code = c.country_code
AND p2_silver.ranking = 2) AS silver_medals,
(SELECT COUNT(p3_bronze.ranking)
FROM Participates_In p3_bronze
JOIN Athlete a3_bronze ON p3_bronze.athlete_id = a3_bronze.athlete_id
WHERE a3_bronze.country_code = c.country_code
AND p3_bronze.ranking = 3) AS bronze_medals,
(SELECT COUNT(DISTINCT p_unique.athlete_id)
FROM Participates_In p_unique
JOIN Athlete a_unique ON p_unique.athlete_id = a_unique.athlete_id
WHERE a_unique.country_code = c.country_code
AND p_unique.ranking IN (1, 2, 3)) AS unique_medalists
FROM Country c
GROUP BY c.country_code, c.country_name, c.continent
ORDER BY unique_medalists DESC
LIMIT 15;
```

| country_code | country_name | continent | gold_medals | silver_medals | bronze_medals | unique_medalists |
| ------------ | ------------ | --------- | ----------- | ------------- | ------------- | ---------------- |
| NOR | Norway | Europe | 14 | 10 | 9 | 20| 
| USA | United States | North America | 9 | 8 | 7 | 20 |
| ITA | Italy | Europe | 6 | 3 | 9 | 16 |
| JPN | Japan | Asia | 4 | 7 | 10 | 16 |
| SUI | Switzerland | Europe | 5 | 4 | 5 | 11 |
| NED | Netherlands | Europe | 9 | 6 | 3 | 11 |
| FRA | France | Europe | 3 | 8 | 5 | 11 |
| AUT | Austria | Europe | 3 | 5 | 3 | 10 |
| GER | Germany | Europe | 4 | 4 | 2 | 10 |
| CAN | Canada | North America | 3 | 4 | 6 | 9 |
| CHN | China | Asia | 5 | 4 | 4 | 9 |
| SWE | Sweden | Europe | 5 | 4 | 3 | 9 |
| KOR | South Korea | Asia | 2 | 3 | 3 | 7 |
| AUS | Australia | Oceania | 3 | 2 | 1 | 6 |
| CZE | Czech Republic | Europe | 2 | 2 | 1 | 4 |

### Query 2: Athete Age Gap By Sport
**Output Schema**: sport_name, youngest_athlete_dob, oldest_athlete_dob, difference_in_years
<br>**Query Description**: This query first makes a list of athletes' date of birth and sport, then finds the youngest and oldest athlete in each sport,
and calculates the difference in years. It groups the results by sport and orders by the largest difference in years between
the youngest and oldest athletes in the given sport. The reason why the query excluded event_ids 117, 118, 119, 121,
and 122 is because as of the time of data collection from the Olympic website, there were athletes that didn’t have any
events they were participating in, just listed as “To Be Determined”. To build a complete database, these athletes were
added, but we created “To Be Determined” events.
```
SELECT
sport_name,
MAX(date_of_birth) AS youngest_athlete_dob,
MIN(date_of_birth) AS oldest_athlete_dob,
(MAX(date_of_birth) - MIN(date_of_birth))/365 AS difference_in_years
FROM (
SELECT S.sport_id, S.sport_name, A.date_of_birth
FROM Athlete A
JOIN Participates_In PI ON PI.athlete_id = A.athlete_id
JOIN Event E ON E.event_id = PI.event_id
JOIN Sport S ON S.sport_id = E.sport_id
WHERE PI.event_id NOT IN (117, 118, 119, 121, 122)
UNION ALL
SELECT S.sport_id, S.sport_name, A.date_of_birth
FROM Athlete A
JOIN Team_Member TM ON TM.athlete_id = A.athlete_id
JOIN Competes_In CI ON CI.team_id = TM.team_id
JOIN Event E ON E.event_id = CI.event_id
JOIN Sport S ON S.sport_id = E.sport_id
WHERE CI.event_id NOT IN (117, 118, 119, 121, 122)
) AS subquery
GROUP BY sport_id, sport_name
ORDER BY difference_in_years DESC;
```

| sport_name | youngest_athlete_dob | oldest_athlete_dob | difference_in_years |
| ---------- | -------------------- | ------------------ | ------------------- |
| Snowboard | 2010-10-13 | 1973-07-07 | 37 |
| Curling | 2006-11-02 | 1971-03-31 | 35 |
| Alpine Skiing | 2009-05-28 | 1979-02-19 | 30 |
| Cross-Country Skiing | 2009-07-25 | 1979-07-10 | 30 |
| Freestyle Skiing | 2010-05-01 | 1980-08-06 | 29 |
| Bobsleigh | 2007-08-16 | 1979-03-13 | 28 |
| Biathlon | 2009-04-21 | 1983-02-23 | 26 |
| Luge | 2007-09-04 | 1981-06-28 | 26 |
| Speed Skating | 2007-12-06 | 1983-05-26 | 24 |
| Figure Skating | 2008-04-27 | 1983-06-22 | 24 |
| Ice Hockey | 2009-02-18 | 1985-03-06 | 23 |
| Skeleton | 2008-01-28 | 1984-04-13 | 23 |
| Nordic Combined | 2009-10-08 | 1988-05-26 | 21 |
| Ski Mountaineering | 2006-09-10 | 1985-09-09 | 21 |
| Ski Jumping | 2009-04-13 | 1987-05-25 | 21 |
| Short Track Speed Skating | 2007-12-23 | 1990-04-14 | 17 |

### Query 3: Top Venues by Number of Events and Participating Teams
**Output Schema**: venue_id, venue_name, location, total_events, total_teams
<br>**Query Description**: This query connects the Venue, Event, and Competes_In tables to find which venues host the most activity. It counts
how many events are held at each venue and how many distinct teams compete in those events. The results are grouped
by venue and ordered from the busiest venue to the least busy. This helps identify the most active venues in the
database.

```SELECT v.venue_id, v.venue_name, v.location,
COUNT(DISTINCT e.event_id) AS total_events,
(
SELECT COUNT(DISTINCT c.team_id)
FROM Competes_In c
WHERE c.event_id IN (
SELECT e2.event_id
FROM Event e2
WHERE e2.venue_id = v.venue_id
AND e2.event_id NOT IN (117,118,119,121,122)
)
) AS total_teams
FROM Venue v, Event e
WHERE v.venue_id = e.venue_id
AND e.event_id NOT IN (117,118,119,121,122)
GROUP BY v.venue_id, v.venue_name, v.location
HAVING COUNT(DISTINCT e.event_id) > 0
ORDER BY total_events DESC;
```

| venue_id | venue_name | location | total_events | total_teams |
| -------- | ---------- | -------- | ------------ | ----------- |
| 11 | Livigno Snow Park | Valtellina | 26 | 23 |
| 4 | Milano Speed Skating Stadium | Milan | 14 | 16 |
| 5 | Milano Ice Skating Arena | Milan | 14 | 71 |
| 9 | Cortina Sliding Centre | Cortina d'Ampezzo | 12 | 131 |
| 14 | Tesero Cross-Country Skiing Stadium | Val di Fiemme | 12 | 89 |
| 7 | Anterselva Biathlon Arena | Cortina d'Ampezzo | 11 | 61 |
| 10 | Stelvio Ski Centre | Valtellina | 9 | 61 |
| 13 | Predazzo Ski Jumping Stadium | Val di Fiemme | 9 | 43 |
| 6 | Tofane Alpine Skiing Centre | Cortina d'Ampezzo | 4 | 0 |
| 8 | Cortina Curling Olympic Stadium | Cortina d'Ampezzo | 3 | 30 |
| 1 | Milano San Siro Olympic Stadium | Milan | 1 | 0 |
| 3 | Milano Rho Ice Hockey Arena | Milan | 1 | 10 |
| 2 | Milano Santa Giulia Ice Hockey Arena | Milan | 1 | 12 |
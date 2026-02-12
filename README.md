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
(event_date), a round type (round_type) indicating Qualifier, Semifinal, or Final, an event type (event_type)
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

Team (team_id, gender_category, country_code, num_of_athletes)
foreign key (country_code) references Country (country_code)

Sport (sport_id, sport_name, description)

Venue (venue_id, venue_name, location, venue_type, capacity)

Event(event_id, event_name, event_time, event_date, round_type, event_type, gender_category, sport_id,
venue_id)
- foreign key (sport_id) references Sport (sport_id)
- foreign key (venue_id) references Venue (venue_id)

Coach (coach_id, coach_name, specialty, country_code)
-foreign key (country_code) references Country (country_code)

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
| Team | team_id<br>gender_category<br>country_code<br>num_of_althelets | Unique team ID<br>gender category of team (Men, Women, Mixed)<br>unique ID of country that fields this team<br>Count of the athletes |
| Sport | sport_id<br>sport_name<br>description | Unique sport ID<br>Name of the sport<br>Description of the sport |
|Venue|venue_id<br>venue_name<br>location<br>venue_type<br>capacity | Unique venue ID<br>Name of the venue<br>Location/address of the venue<br>Type of venue (Indoor, Outdoor)<br>Maximum capacity of the venue |
| Event | event_id<br>event_name<br>event_time<br>event_date<br>round_type<br>event_type<br>gender_category<br>sport_id<br>venue_id | Unique event ID<br>Name of the event<br>Time when the event takes place<br>Date when the event takes place<br>Type of round (Qualifier, Semifinal, Final)<br>Type of event (Individual, Team)<br>Gender category (Men, Women, Mixed)<br>Unique ID of sport this event belongs to<br>Unique ID of venue where event is held |
| Coach |coach_id<br>coach_name<br>specialty<br>country_code | Unique coach ID<br>Name of the coach<br>Coaching speciality area<br>Unique ID of country coach is affiliated with |
| Athlete | athlete_id<br>athlete_name<br>gender<br>date_of_birth<br>country_code | Unique athlete ID<br>Name of the athlete<br>Gender of the athlete<br>Birth date of the athlete<br>Unique ID of country athlete represents |
| Trains | coach_id<br>athlete_id<br>year |  Unique ID of coach training the athlete<br>Unique ID of athlete being trained<br>year of training relationship |
| Participates_In | athlete_id<br>event_id<br>ranking | Unique ID of athlete participating in event<br>Unique ID of event athlete is participating in<br>Ranking/position of athlete in event |
| Competes_In | team_id<br>event_id<br>ranking | Unique ID of team competing in event<br>Unique ID of event team is competing in<br>Ranking/position of team in event |
| Team_Member | athlete_id<br>team_id | Unique ID of athlete who is member of team<br>Unique ID of team athlete belongs to |




BEGIN TRANSACTION;

DROP TABLE IF EXISTS Participates_In CASCADE; 
DROP TABLE IF EXISTS Competes_In CASCADE;
DROP TABLE IF EXISTS Team_Member CASCADE;
DROP TABLE IF EXISTS Trains CASCADE;
DROP TABLE IF EXISTS Coach CASCADE;
DROP TABLE IF EXISTS Team CASCADE;
DROP TABLE IF EXISTS Athlete CASCADE; 
DROP TABLE IF EXISTS Event CASCADE;
DROP TABLE IF EXISTS Venue CASCADE;
DROP TABLE IF EXISTS Sport CASCADE;
DROP TABLE IF EXISTS Country CASCADE;

CREATE TABLE Country (
	country_code VARCHAR(3) PRIMARY KEY, 
	alpha_2 VARCHAR(2) NOT NULL, 
	country_name VARCHAR(100) NOT NULL, 
	continent VARCHAR(50) NOT NULL 
);

CREATE TABLE Athlete ( 
	athlete_id INT PRIMARY KEY,
	athlete_name VARCHAR(100) NOT NULL, 
	gender CHAR(1) NOT NULL,
	date_of_birth DATE NOT NULL, 
	country_code VARCHAR(3) NOT NULL, 
CONSTRAINT fk_athlete_country FOREIGN KEY (country_code) REFERENCES Country(country_code)
);

CREATE TABLE Sport (
    sport_id INT,
    sport_name VARCHAR(100) NOT NULL,
    description TEXT,
    PRIMARY KEY (sport_id)
);

CREATE TABLE Venue (
venue_id INT PRIMARY KEY,
venue_name VARCHAR(100) NOT NULL,
location VARCHAR(150) NOT NULL,
venue_type VARCHAR(50),
capacity INT
);


CREATE TABLE Event (
event_id INT PRIMARY KEY,
event_name VARCHAR(100) NOT NULL,
event_time TIME,
event_date DATE,
event_type VARCHAR(50),
gender_category VARCHAR(20),
venue_id INT,
sport_id INT,
FOREIGN KEY (venue_id) REFERENCES Venue(venue_id)
);

CREATE TABLE Coach ( 
	coach_id INT PRIMARY KEY, 
	coach_name VARCHAR(100) NOT NULL, 
	specialty VARCHAR(100) NOT NULL
 );

CREATE TABLE Trains (
	coach_id INT,
	athlete_id INT,
	year INT,
	PRIMARY KEY (coach_id, athlete_id),
	CONSTRAINT fk_trains_coach FOREIGN KEY (coach_id) REFERENCES Coach (coach_id),
	CONSTRAINT fk_trains_athlete FOREIGN KEY (athlete_id) REFERENCES Athlete (athlete_id)
);

CREATE TABLE Team (
    team_id INT,
    gender_category VARCHAR(10),
    PRIMARY KEY (team_id)
);


CREATE TABLE Team_Member (
    athlete_id INT,
    team_id INT,
    PRIMARY KEY (athlete_id, team_id),
    CONSTRAINT fk_member_athlete FOREIGN KEY (athlete_id) REFERENCES Athlete (athlete_id),
    CONSTRAINT fk_member_team FOREIGN KEY (team_id) REFERENCES Team (team_id)
);

CREATE TABLE Participates_In (
	athlete_id INT, 
	event_id INT, 
	ranking INT, PRIMARY KEY (athlete_id, event_id), 

CONSTRAINT fk_participates_athlete FOREIGN KEY (athlete_id) REFERENCES Athlete(athlete_id), 
CONSTRAINT fk_participates_event FOREIGN KEY (event_id) REFERENCES Event(event_id) 
);

CREATE TABLE Competes_In (
team_id INT,
event_id INT,
ranking INT,
PRIMARY KEY (team_id, event_id),
FOREIGN KEY (team_id) REFERENCES Team(team_id),
FOREIGN KEY (event_id) REFERENCES Event(event_id)
);

COMMIT;
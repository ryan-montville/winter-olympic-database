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

INSERT INTO Country (country_code, alpha_2, country_name, continent) VALUES
('ALB', 'AL', 'Albania', 'Europe'),
('AND', 'AD', 'Andorra', 'Europe'),
('ARG', 'AR', 'Argentina', 'South America'),
('ARM', 'AM', 'Armenia', 'Asia'),
('AUS', 'AU', 'Australia', 'Oceania'),
('AUT', 'AT', 'Austria', 'Europe'),
('AZE', 'AZ', 'Azerbaijan', 'Asia'),
('BEL', 'BE', 'Belgium', 'Europe'),
('BEN', 'BJ', 'Benin', 'Africa'),
('BOL', 'BO', 'Bolivia', 'South America');

INSERT INTO Athlete (athlete_id, athlete_name, gender, date_of_birth, country_code) VALUES
(1, 'AABREKK Ingrid Bergene', 'F', '2002/10/14', 'NOR'),
(2, 'AAGAARD Mikkel', 'M', '1995/10/18', 'DEN'),
(3, 'AALTO Antti', 'M', '1995/04/02', 'FIN'),
(4, 'ABATANGELO Aurora', 'F', '2002/12/14', 'ITA'),
(5, 'ABDI Fayik', 'M', '1997/10/8', 'KSA'),
(6, 'ABDUL-SABOOR Hakeem', 'M', '1987/11/7', 'USA'),
(7, 'ABEDA Shannon', 'M', '1996/05/15', 'ERI'),
(8, 'ABSTREITER Sandra', 'F', '1998/07/23', 'GER'),
(9, 'ACHLEITNER Lisa', 'F', '1997/01/18', 'AUT'),
(10, 'ADAKE Ahenaer', 'F', '1999/06/1', 'CHN');

INSERT INTO Sport (sport_id, sport_name, description) VALUES
(1, 'Alpine Skiing', 'Alpine skiing is a Winter Olympic sport that involves sliding down snow-covered hills on skis with fixed-heel bindings, requiring athletes to navigate through a series of gated markers at high speeds.'),
(2, 'Biathlon', 'Biathlon is a Winter Olympic sport that combines the physical endurance of cross-country skiing with the precision of rifle marksmanship, as athletes alternate between high-intensity racing and bouts of target shooting.'),
(3, 'Bobsleigh', 'Bobsleigh is a high-speed Winter Olympic sport where teams of two or four athletes make timed runs down narrow, twisting, banked, iced tracks in a gravity-powered aerodynamic sled.'),
(4, 'Cross-Country Skiing', 'Cross-country skiing is a Winter Olympic sport where competitors rely on their own locomotion to traverse snow-covered terrain using skis and poles, unlike downhill skiing which utilizes ski lifts or specialized mountain access.'),
(5, 'Curling', 'Curling is a team sport played on a rectangular sheet of ice where players slide polished granite stones toward a circular target area, known as the house, while using specialized brooms to manipulate the ice''s friction and influence the stone''s path.'),
(6, 'Figure Skating', 'Figure skating is a Winter Olympic sport where individuals, pairs, or groups perform choreographed routines on ice skates, combining technical elements like jumps and spins with artistic expression and musical interpretation.'),
(7, 'Freestyle Skiing', 'Freestyle skiing is a Winter Olympic sport that emphasizes aerial maneuvers, technical tricks, and artistic flair as athletes navigate diverse courses including moguls, halfpipes, and massive jumps.'),
(8, 'Ice Hockey', 'Ice hockey is a high-speed team sport played on an ice rink where skaters use sticks to shoot a vulcanized rubber puck into the opposing team''s net to score points.'),
(9, 'Luge', 'Luge is a high-speed Winter Olympic sport where an individual or a pair of athletes lies face-up and feet-first on a small sled, steering through a banked ice track using only their calf muscles and shoulder pressure.');

INSERT INTO Venue (venue_id, venue_name, location, venue_type, capacity) VALUES
(1, 'Milano San Siro Olympic Stadium', 'Milan', 'indoor', 75817),
(2, 'Milano Santa Giulia Ice Hockey Arena', 'Milan', 'indoor', 12000),
(3, 'Milano Rho Ice Hockey Arena', 'Milan', 'indoor', 6000),
(4, 'Milano Speed Skating Stadium', 'Milan', 'indoor', 7500),
(5, 'Milano Ice Skating Arena', 'Milan', 'indoor', 11500),
(6, 'Tofane Alpine Skiing Centre', 'Cortina d''Ampezzo', 'outdoor', 7000),
(7, 'Anterselva Biathlon Arena', 'Cortina d''Ampezzo', 'outdoor', 19000),
(8, 'Cortina Curling Olympic Stadium', 'Cortina d''Ampezzo', 'indoor', 3000),
(9, 'Cortina Sliding Centre', 'Cortina d''Ampezzo', 'outdoor', 5500),
(10, 'Stelvio Ski Centre', 'Valtellina', 'outdoor', 7000),
(11, 'Livigno Snow Park', 'Valtellina', 'outdoor', 2000);

INSERT INTO Event (event_id, event_name, event_time, event_date, event_type, gender_category, venue_id, sport_id) VALUES
(1, 'Women''s Downhill', '11:30', TO_DATE('02/08/2026', 'MM/DD/YYYY'), 'Individual', 'Women', 6, 1),
(2, 'Men''s Team Combined', '10:30', TO_DATE('02/09/2026', 'MM/DD/YYYY'), 'Team', 'Men', 10, 1),
(3, 'Women''s Team Combined', '10:30', TO_DATE('02/10/2026', 'MM/DD/YYYY'), 'Team', 'Women', 10, 1),
(4, 'Men''s Super-G', '11:30', TO_DATE('02/11/2026', 'MM/DD/YYYY'), 'Individual', 'Men', 10, 1),
(5, 'Women''s Super-G', '11:30', TO_DATE('02/12/2026', 'MM/DD/YYYY'), 'Individual', 'Women', 6, 1),
(6, 'Men''s Giant Slalom', '10:00', TO_DATE('02/14/2026', 'MM/DD/YYYY'), 'Individual', 'Men', 10, 1),
(7, 'Women''s Giant Slalom', '10:00', TO_DATE('02/15/2026', 'MM/DD/YYYY'), 'Individual', 'Women', 6, 1),
(8, 'Men''s Slalom', '10:00', TO_DATE('02/16/2026', 'MM/DD/YYYY'), 'Individual', 'Men', 10, 1),
(9, 'Women''s slalom', '10:00', TO_DATE('02/18/2026', 'MM/DD/YYYY'), 'Individual', 'Women', 6, 1),
(10, 'Mixed 4 X 6 km Relay', '14:05', TO_DATE('02/08/2026', 'MM/DD/YYYY'), 'Team', 'Mixed', 7, 2),
(11, 'Men''s 20 km Individual', '13:30', TO_DATE('02/10/2026', 'MM/DD/YYYY'), 'Individual', 'Men', 7, 2);

INSERT INTO Coach (coach_id, coach_name, specialty) VALUES
(1, 'BOUCHARD Eric', 'Ice Hockey'),
(2, 'CERNOVSKY Vladimir', 'Curling'),
(3, 'CHARETTE Pierre', 'Curling'),
(4, 'COOPER Jon', 'Ice Hockey'),
(5, 'de CRUZ Peter', 'Curling'),
(6, 'FISCHER Patrick', 'Ice Hockey'),
(7, 'FRY Ryan', 'Curling'),
(8, 'FUNAYAMA Yumie', 'Curling'),
(9, 'GATH Mikael', 'Ice Hockey'),
(10, 'GOODFELLOW Michael', 'Curling'),
(11, 'GRAN Soeren', 'Curling');

INSERT INTO Trains (coach_id, athlete_id, year) VALUES
(1, 4, 2026),
(1, 226, 2026),
(1, 339, 2026),
(1, 496, 2026),
(1, 566, 2026),
(1, 630, 2026),
(1, 639, 2026),
(1, 696, 2026),
(1, 857, 2026),
(1, 947, 2026);

INSERT INTO Team (team_id, gender_category) VALUES
(1, 'Women'),
(4, 'Mixed'),
(8, 'Mixed'),
(9, 'Mixed'),
(10, 'Mixed'),
(11, 'Women'),
(12, 'Mixed'),
(13, 'Mixed'),
(14, 'Women'),
(15, 'Men');

INSERT INTO Team_Member (athlete_id, team_id) VALUES
(2,  141),
(4,  275),
(8,  213),
(10,  108),
(12,  407),
(13,  424),
(14,  170),
(15,  446),
(18,  153),
(19,  154);

INSERT INTO Participates_In (athlete_id, event_id, ranking) VALUES
(1, 28, NULL),
(3, 83, NULL),
(5, 117, NULL),
(6, 118, NULL),
(7, 117, NULL),
(9, 29, NULL),
(10, 115, NULL),
(11, 97, 2),
(13, 11, NULL),
(13, 13, NULL);

INSERT INTO Competes_In (team_id, event_id, ranking) VALUES
(1, 3, NULL),
(4, 42, NULL),
(8, 90, NULL),
(9, 99, NULL),
(10, 99, NULL),
(11, 23, NULL),
(12, 42, NULL),
(13, 43, NULL),
(14, 23, NULL),
(15, 87, 1);

COMMIT;
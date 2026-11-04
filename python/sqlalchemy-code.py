from datetime import date, time
from sqlalchemy import Column
from sqlalchemy import Table
from typing import List
from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy import String, Integer
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import relationship
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy import Date
from sqlalchemy import Time


engine = create_engine("postgresql+psycopg2://postgres:password@localhost/postgres")

class Base(DeclarativeBase):
    pass

## Create classes ##
association_ae_participates_in = Table(
    "participates_in",
    Base.metadata,
    Column("AID", ForeignKey("athlete.athlete_id"), primary_key=True),
    Column("EID", ForeignKey("event.event_id"), primary_key=True)
)

# We have combined the Athlete class used for query 1 and 2. 
# The inserted data will have links to either events (RYAN MONTVILLE) or country (SALMANUDDIN TALHA MOHD)
# Independently created by SALMANUDDIN TALHA MOHD and RYAN MONTVILLE, then later merged for this file
class Athlete(Base):
    __tablename__ = "athlete"
    athlete_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    athlete_name: Mapped[str] = mapped_column(String(100))
    gender: Mapped[str] = mapped_column(String(1))
    date_of_birth: Mapped[date] = mapped_column(Date)
    country_code: Mapped[str] = mapped_column(String(3), ForeignKey("country.country_code"))
    events: Mapped[List["Event"]] = relationship(
        secondary=association_ae_participates_in, back_populates="athletes"
    )
    country: Mapped["Country"] = relationship(back_populates="athletes")

# Created by SALMANUDDIN TALHA MOHD 
class Country(Base):
   __tablename__ = "country"
 
   country_code: Mapped[str] = mapped_column(String(3), primary_key=True)
   alpha_2: Mapped[str] = mapped_column(String(2))
   country_name: Mapped[str] = mapped_column(String(100))
   continent: Mapped[str] = mapped_column(String(50))
   athletes: Mapped[List["Athlete"]] = relationship(
       back_populates="country", cascade="all, delete-orphan"
   )

# We have combined the Event class used for query 2 and 3. 
# The inserted data will have links to either athlete (RYAN MONTVILLE) or sport (HUGO GRANILLO)
# Independently created by RYAN MONTVILLE and HUGO GRANILLO, then later merged for this file
class Event(Base):
    __tablename__ = "event"
    event_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    event_name: Mapped[str] = mapped_column(String(100))
    event_time: Mapped[time] = mapped_column(Time)
    event_date: Mapped[date] = mapped_column(Date)
    event_type: Mapped[str] = mapped_column(String(50))
    gender_category: Mapped[str] = mapped_column(String(20))
    venue_id: Mapped[int] = mapped_column(Integer)
    sport_id: Mapped[int] = mapped_column(ForeignKey("sport.sport_id"))
    athletes: Mapped[List["Athlete"]] = relationship(
        secondary=association_ae_participates_in, back_populates="events"
    )
    sport: Mapped["Sport"] = relationship(back_populates="events")

# Created by HUGO GRANILLO
class Sport(Base):
    __tablename__ = "sport"
    sport_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    sport_name: Mapped[str] = mapped_column(String(100))
    events: Mapped[List["Event"]] = relationship(back_populates="sport")


Base.metadata.drop_all(engine)
Base.metadata.create_all(engine)
print("\nCreated all classes")

## Insert data ##
with Session(engine) as session:
    # Data not used in any queries, but needed to satisfy FK requeirments
    latvia = Country(
       country_code="LAT",
       alpha_2="LV",
       country_name="Latvia",
       continent="Europe",
   )

    sweden = Country(
        country_code="SWE",
        alpha_2="SE",
        country_name="Sweden",
        continent="Europe",
    )

    japan = Country(
        country_code="JPN",
        alpha_2="JP",
        country_name="Japan",
        continent="Asia",
    )

    china = Country(
        country_code="CHN",
        alpha_2="CN",
        country_name="China",
        continent="Asia",
    )

    cross_coutry = Sport(sport_id=4, sport_name="Cross-Country Skiing")
    snowboarding = Sport(sport_id=15, sport_name="Snowboard")

    session.add_all([latvia, sweden, japan, china, cross_coutry, snowboarding])
    session.commit()


    # Data for query 1 - created by SALMANUDDIN TALHA MOHD 
    norway = Country(
       country_code="NOR",
       alpha_2="No",
       country_name="Norway",
       continent="Europe",
       athletes=[
           Athlete(athlete_id=1, athlete_name="Aabrekk Ingrid Bergene", gender="F", date_of_birth=date(2002, 10, 14), country_code="NOR"),
           Athlete(athlete_id=51, athlete_name="Amundsen Harald Oestberg", gender="M", date_of_birth=date(1998, 9, 18),  country_code="NOR"),
           Athlete(athlete_id=90,  athlete_name="Arnekleiv Juni", gender="F", date_of_birth=date(1999, 2, 17),  country_code="NOR"),
           Athlete(athlete_id=240, athlete_name="Botn Johan-Olav", gender="M", date_of_birth=date(1999, 6, 18),  country_code="NOR"),
           Athlete(athlete_id=591, athlete_name="Eie Sandra", gender="F", date_of_birth=date(1995, 11, 14), country_code="NOR"),
           Athlete(athlete_id=1289, athlete_name="Klaebo Johannes Hoesflot", gender="M", date_of_birth=date(1996, 10, 22), country_code="NOR"),
       ]
   )
 
    usa = Country(
       country_code="USA",
       alpha_2="US",
       country_name="United States",
       continent="North America",
       athletes=[
           Athlete(athlete_id=198, athlete_name="Bickner Kevin", gender="M", date_of_birth=date(1996, 9, 23),  country_code="USA"),
           Athlete(athlete_id=225, athlete_name="Boldy Matt", gender="M", date_of_birth=date(2001, 4, 5),   country_code="USA"),
           Athlete(athlete_id=320, athlete_name="Canter Jake", gender="M", date_of_birth=date(2003, 7, 19),  country_code="USA"),
           Athlete(athlete_id=434,  athlete_name="Connor Kyle", gender="M", date_of_birth=date(1996, 12, 9),  country_code="USA"),
           Athlete(athlete_id=55, athlete_name="Anderson Lucinda", gender="F", date_of_birth=date(2000, 12, 3),  country_code="USA"),
           Athlete(athlete_id=2315, athlete_name="Shiffrin Mikaela", gender="F", date_of_birth=date(1995, 3, 13),  country_code="USA"),
       ]
   )
 
    germany = Country(
       country_code="GER",
       alpha_2="DE",
       country_name="Germany",
       continent="Europe",
       athletes=[
           Athlete(athlete_id=48, athlete_name="Ammour Adam", gender="M", date_of_birth=date(2001, 6, 7),   country_code="GER"),
           Athlete(athlete_id=86, athlete_name="Arlt Tobias", gender="M", date_of_birth=date(1987, 6, 2),   country_code="GER"),
           Athlete(athlete_id=153,  athlete_name="Baumeister Stefan", gender="M", date_of_birth=date(1993, 4, 18),  country_code="GER"),
           Athlete(athlete_id=8, athlete_name="Abstreiter Sandra", gender="F", date_of_birth=date(1998, 7, 23),  country_code="GER"),
           Athlete(athlete_id=21, athlete_name="Aicher Emma", gender="F", date_of_birth=date(2003, 11, 13), country_code="GER"),
           Athlete(athlete_id=140, athlete_name="Bartsch Anne", gender="F", date_of_birth=date(1995, 9, 22),  country_code="GER"),
       ]
   )
 
    canada = Country(
       country_code="CAN",
       alpha_2="CA",
       country_name="Canada",
       continent="North America",
       athletes=[
           Athlete(athlete_id=31, athlete_name="Alexander Cameron", gender="M", date_of_birth=date(1997, 5, 31),  country_code="CAN"),
           Athlete(athlete_id=176, athlete_name="Bennett Sam", gender="M", date_of_birth=date(1996, 6, 20),  country_code="CAN"),
           Athlete(athlete_id=197, athlete_name="Bichon Evan", gender="M", date_of_birth=date(1998, 10, 12), country_code="CAN"),
           Athlete(athlete_id=347, athlete_name="Celebrini Macklin", gender="M", date_of_birth=date(2006, 6, 13),  country_code="CAN"),
           Athlete(athlete_id=1789, athlete_name="Mcdavid Connor", gender="M", date_of_birth=date(1997, 1, 13),  country_code="CAN"),
           Athlete(athlete_id=32, athlete_name="Alexander Kiki", gender="F", date_of_birth=date(2001, 9, 6),   country_code="CAN"),
       ]
   )
 
    finland = Country(
       country_code="FIN",
       alpha_2="FI",
       country_name="Finland",
       continent="Europe",
       athletes=[
           Athlete(athlete_id=3, athlete_name="Aalto Antti", gender="M", date_of_birth=date(1995, 4, 2),   country_code="FIN"),
           Athlete(athlete_id=18, athlete_name="Aho Sebastian", gender="M", date_of_birth=date(1997, 7, 26),  country_code="FIN"),
           Athlete(athlete_id=20, athlete_name="Ahvenainen Akseli", gender="M", date_of_birth=date(2002, 6, 25),  country_code="FIN"),
           Athlete(athlete_id=818, athlete_name="Granlund Mikael", gender="M", date_of_birth=date(1992, 2, 26),  country_code="FIN"),
           Athlete(athlete_id=19, athlete_name="Ahola Sanni", gender="F", date_of_birth=date(2000, 6, 3),   country_code="FIN"),
           Athlete(athlete_id=979, athlete_name="Hiirikoski Jenni", gender="F", date_of_birth=date(1987, 3, 30),  country_code="FIN"),
       ]
    )

    session.add_all([norway, usa, germany, canada, finland])
    session.commit()
    print("\nInserted Country and Athlete data for Query 1")

    # Data for query 3 - Created by HUGO GRANILLO
    sports = [
        Sport(sport_id=1, sport_name="Alpine Skiing"),
        Sport(sport_id=2, sport_name="Biathlon"),
        Sport(sport_id=5, sport_name="Curling"),
        Sport(sport_id=6, sport_name="Figure Skating"),
        Sport(sport_id=8, sport_name="Ice Hockey"),
        Sport(sport_id=16, sport_name="Speed Skating"),
    ]


    # EVENTS
    events = [
        Event(
            event_id=9901,
            event_name="Women's Slalom Final",
            event_time=time(10, 0, 0),
            event_date=date(2026, 2, 8),
            event_type="Individual",
            gender_category="Women",
            venue_id=1,
            sport_id=1
        ),
        Event(
            event_id=9902,
            event_name="Women's Giant Slalom Final",
            event_time=time(12, 30, 0),
            event_date=date(2026, 2, 10),
            event_type="Individual",
            gender_category="Women",
            venue_id=1,
            sport_id=1
        ),
        Event(
            event_id=9903,
            event_name="Women's Figure Skating Final",
            event_time=time(14, 0, 0),
            event_date=date(2026, 2, 11),
            event_type="Individual",
            gender_category="Women",
            venue_id=2,
            sport_id=6
        ),
        Event(
            event_id=9904,
            event_name="Women's Speed Skating 1000m Final",
            event_time=time(16, 0, 0),
            event_date=date(2026, 2, 12),
             event_type="Individual",
            gender_category="Women",
            venue_id=2,
            sport_id=16
        ),
        Event(
            event_id=9905,
            event_name="Women's Biathlon Sprint Final",
            event_time=time(9, 15, 0),
            event_date=date(2026, 2, 9),
            event_type="Individual",
            gender_category="Women",
            venue_id=3,
            sport_id=2
        ),
        Event(
            event_id=9906,
            event_name="Women's Biathlon Pursuit Final",
            event_time=time(11, 45, 0),
            event_date=date(2026, 2, 13),
            event_type="Individual",
            gender_category="Women",
            venue_id=3,
            sport_id=2
        ),
        Event(
            event_id=9907,
            event_name="Women's Curling Singles Final",
            event_time=time(13, 0, 0),
            event_date=date(2026, 2, 14),
            event_type="Individual",
            gender_category="Women",
            venue_id=4,
            sport_id=5
        ),
        Event(
            event_id=9908,
            event_name="Women's Hockey Skills Challenge Final",
            event_time=time(15, 30, 0),
            event_date=date(2026, 2, 16),
            event_type="Individual",
            gender_category="Women",
            venue_id=5,
            sport_id=8
        ),
    ]

    session.add_all(sports + events)
    session.commit()
    print("\nInserted Sport and Event data for query 3")

    # Data for query 2 - created by RYAN MONTVILLE 
    e15 = Event(
        event_id=15,
        event_name="Men's 12.5 km Pursuit",
        event_time="11:15:00",
        event_date="2026-02-15",
        event_type="Individual",
        gender_category="Men",
        venue_id=7,
        sport_id=2
    )
    e25 = Event(
        event_id=25,
        event_name="Women's Skiathlon",
        event_time="13:00:00",
        event_date="2026-02-07",
        event_type="Individual",
        gender_category="Women",
        venue_id=14,
        sport_id=4
    )
    e28 = Event(
        event_id=28,
        event_name="Women's Individual Sprint Classical",
        event_time="09:15:00",
        event_date="2026-02-10",
        event_type="Individual",
        gender_category="Women",
        venue_id=14,
        sport_id=4
    )
    e29 = Event(
        event_id=29,
        event_name="Women's 10 km Freestyle",
        event_time="13:00:00",
        event_date="2026-02-12",
        event_type="Individual",
        gender_category="Women",
        venue_id=14,
        sport_id=4
    )
    e41 = Event(
        event_id=41,
        event_name="Women's Singles",
        event_time="19:00:00",
        event_date="2026-02-19",
        event_type="Individual",
        gender_category="Women",
        venue_id=5,
        sport_id=6
    )
    e91 = Event(
        event_id=91,
        event_name="Men's Big Air",
        event_time="19:30:00",
        event_date="2026-02-05",
        event_type="Individual",
        gender_category="Men",
        venue_id=11,
        sport_id=15
    )
    a1 = Athlete(
        athlete_id=107,
        athlete_name="AUZINA Kitija",
        gender="F",
        date_of_birth="1996-09-23",
        country_code="LAT",
        events=[e28, e29]
    )

    a2 = Athlete(
        athlete_id=467,
        athlete_name="DAHLQVIST Maja",
        gender="F",
        date_of_birth="1994-04-15",
        country_code="SWE",
        events=[e28]
    )
    a3 = Athlete(
        athlete_id=518,
        athlete_name="DIGGINS Jessie",
        gender="F",
        date_of_birth="1991-08-26",
        country_code="USA",
        events=[e25, e28, e29]
    )
    a4 = Athlete(
        athlete_id=1219,
        athlete_name="KARLSSON Frida",
        gender="F",
        date_of_birth="1999-08-10",
        country_code="SWE",
        events=[e25, e29]
    )
    a5 = Athlete(
        athlete_id=1274,
        athlete_name="KIMATA Ryoma",
        gender="M",
        date_of_birth="2002-07-24",
        country_code="JPN",
        events=[e15, e91]
    )
    a6 = Athlete(
        athlete_id=1275,
        athlete_name="KIMURA Kira",
        gender="M",
        date_of_birth="2004-06-30",
        country_code="JPN",
        events=[e15, e91]
    )
    a7 = Athlete(
        athlete_id=1525,
        athlete_name="LIU Alysa",
        gender="F",
        date_of_birth="2005-09-08",
        country_code="USA",
        events=[e41]
    )
    a8 = Athlete(
        athlete_id=2456,
        athlete_name="SU Yiming",
        gender="M",
        date_of_birth="2004-02-18",
        country_code="CHN",
        events=[e15, e91]
    )

    session.add_all([a1, a2, a3, a4, a5, a6, a7, a8])
    session.commit()
    print("\nInserted Athlete and Event data for Query 2")

## Queries ##
session = Session(engine)

# Query 1 - created by SALMANUDDIN TALHA MOHD 
print("\n## Male Athletes from North America Born After 1995 ##\n")
print(f"{'Athlete':<25} {'Country':<20} {'Date of Birth':<15}")
print("-" * 60)
stmt = (
   select(Athlete, Country)
   .join(Athlete.country)
   .where(Athlete.gender == "M")
   .where(Country.continent == "North America")
   .where(Athlete.date_of_birth > date(1995, 12, 31))
)
for athlete, country in session.execute(stmt):
   print(f"{athlete.athlete_name:<25} {country.country_name:<20} {str(athlete.date_of_birth):<15}")

# Query 2 - created by RYAN MONTVILLE 
query = (
    select(Athlete, Event)
    .join(Athlete.events)
)
print("\n##List the athletes and the events they participate in ##\n")
print(f"{'name': <15} | {'country': <5} | {'dob': ^10} | {'event': <10}")
print("-" * 75)
for athlete, events in session.execute(query):
    print(f"{athlete.athlete_name:<15} | {athlete.country_code:^7} | {athlete.date_of_birth!s:<10} | {events.event_name}")

# Query 3 - Created by HUGO GRANILLO
print("\n## Women's Individual Events by Sport ##\n")
print(f"{'Sport':<20} {'Event':<40} {'Date':<15}")
print("-" * 80)
stmt = (
    select(Sport, Event)
    .join(Event, Sport.sport_id == Event.sport_id)
    .where(Event.event_id.in_([9901, 9902, 9903, 9904, 9905, 9906, 9907, 9908]))
    .order_by(Sport.sport_name, Event.event_name)
)

for sport, event in session.execute(stmt):
    print(f"{sport.sport_name:<20} {event.event_name:<40} {str(event.event_date):<15}")

session.close()
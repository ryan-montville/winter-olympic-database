import sqlite3
import csv

conn = sqlite3.connect("tempdb.sqlite")
cursor = conn.cursor()

## Events and the expected number of team members (0 means there is a range, or min/max)
event_num = {2: 2, 3: 2, 10: 4, 17: 4, 18: 4, 22: 2, 23: 2, 24: 4, 31: 4, 32: 4, 33: 2, 34: 2, 37: 5, 38: 5, 39: 2, 42: 2, 43: 2, 44: 0, 58: 3, 60: 25, 61: 23, 64: 2, 65: 2, 66: 0, 68: 2, 70: 4, 76: 4, 78: 4, 81: 2, 84: 4, 87: 2, 90: 2, 99: 2, 110: 0, 111: 0}
## 44		Figure Skating,Team Event 6-10
## 66		Luge,Team Relay,Mixed - 6
## 110		Speed Skating,Men's Team Pursuit - 3 active
## 111  	Speed Skating,Women's Team Pursuit - 3 active

## Find athletes where there is only one possible team for them to be on
# sql = '''
# SELECT country_code, athlete.athlete_id, athlete.athlete_name, sport_name, event.event_id, event_name
# FROM athlete
# JOIN participates_in ON participates_in.athlete_id = athlete.athlete_id
# JOIN event ON event.event_id = participates_in.event_id
# JOIN sport ON sport.sport_id = event.sport_id
# WHERE event_type = 'Team'
# '''
# cursor.execute(sql)
# rows = cursor.fetchall()

# for country_code, athlete_id, athlete_name, sport_name, event_id, event_name in rows:
#     team_search_sql = "SELECT team_id, team_name, country_code FROM teams WHERE country_code = ? AND event_id = ?"
#     cursor.execute(team_search_sql, (country_code, event_id))
#     possible_teams = cursor.fetchall()
#     if len(possible_teams) == 1:
#         for team_id, team_name, country_code in possible_teams:
#             insert_sql = "INSERT INTO Team_Member (athlete_id, team_id) VALUES (?, ?);"
#             cursor.execute(insert_sql, (athlete_id, team_id))

## Make sure teams have correct number of athletes
sql = """
SELECT country_code, team_name, teams.team_id, teams.event_id, sport_name, event_name, COUNT(*) 
FROM teams
JOIN Team_Member ON Team_Member.team_id = teams.team_id
JOIN event ON teams.event_id = event.event_id
JOIN sport ON sport.sport_id = event.sport_id
GROUP BY teams.team_id
ORDER BY teams.event_id
"""
cursor.execute(sql)
rows = cursor.fetchall()
for country_code, team_name, team_id, event_id, sport_name, event_name, num_aths in rows:
    expected_num = event_num[event_id]
    if expected_num > num_aths:
        print(f"{team_id}) {team_name} ({sport_name} | {event_name}) should have {expected_num}, but has {num_aths}")
        team_search_sql = f"""
        SELECT Team_Member.athlete_id, athlete_name
        FROM Team_Member
        JOIN athlete ON athlete.athlete_id = Team_Member.athlete_id
        WHERE team_id =  {team_id}
        """
        cursor.execute(team_search_sql)
        team_members = cursor.fetchall()
        for athlete_id, athlete_name in team_members:
            print(athlete_name)
        missing = expected_num - num_aths
        for i in range(missing):
            other = input(f"Enter the name of member {num_aths + i + 1}: ").strip()
            ath_search_sql = "SELECT athlete_name, athlete_id FROM athlete WHERE country_code=? AND athlete_name=?"
            cursor.execute(ath_search_sql, (country_code, other))
            found = cursor.fetchall()
            for athlete_name, athlete_id in found:
                insert_sql="INSERT INTO Team_Member(athlete_id, team_id) VALUES (?, ?)"
                cursor.execute(insert_sql, (athlete_id, team_id))
                conn.commit()


## Find the teams that have no members

# output = open("teams_with_no_members.csv", "a")
# sql = """
# SELECT team_id, team_name, country_code, event.event_id, sport_name, event_name
# FROM teams
# JOIN event ON event.event_id = teams.event_id
# JOIN sport ON sport.sport_id = teams.sport_id
# WHERE not exists
# (SELECT * FROM Team_Member WHERE teams.team_id = Team_Member.team_id)
# ORDER BY teams.event_id
# """
# cursor.execute(sql)
# rows = cursor.fetchall()

# for team_id, team_name, country_code, event_id, sport_name, event_name in rows:
#     expected_num_members  = event_num[event_id]
#     print(f"{team_name} ({sport_name}-{event_name} {event_id}) should have {expected_num_members} team members")
#     for i in range(expected_num_members):
#         next_member = input(f"Enter the name of member {i + 1}: ").strip()
#         ath_search_sql = f"SELECT athlete_name, athlete_id FROM athlete WHERE country_code = '{country_code}' AND athlete_name LIKE '{next_member}%'"
#         cursor.execute(ath_search_sql)
#         found = cursor.fetchall()
#         if len(found) == 0: 
#             print("Error - athlete not found")
#         for athlete_name, athlete_id in found:
#             insert_sql = "INSERT INTO Team_Member (athlete_id, team_id) VALUES (?, ?);"
#             cursor.execute(insert_sql, (athlete_id, team_id))
#         conn.commit()
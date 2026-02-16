import csv

months = {
    'January': "01",
    'February': "02",
    "March": "03",
    "April": "04",
    "May": "05",
    "June": "06",
    "July": "07",
    "August": "08",
    "September": "09",
    "October": "10",
    "November": "11",
    "December": "12"
}
output = open("athletes_with_dob.csv", "a")
with open('athletes.csv', newline='') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='|')
    next(reader)
    # athlete_id,athlete_name,country_code,gender,sports,events, dob
    for athlete_id,athlete_name,gender,dob,country_code,sports,events in reader:
        dob_parts = dob.split(" ")
        if len(dob_parts) > 1:
            if dob_parts[0] in months:
                dob_parts[0] = months[dob_parts[0]]
                fixed = ("/").join(dob_parts)
                output.write(f"{athlete_id},{athlete_name},{gender},{fixed},{country_code},{sports},{events}\n")
            elif dob_parts[1] in months:
                dob_parts[1] = months[dob_parts[1]]
                fixed = f"{dob_parts[1]}/{dob_parts[0]}/{dob_parts[2]}"
                output.write(f"{athlete_id},{athlete_name},{gender},{fixed},{country_code},{sports},{events}\n")
        else:
            output.write(f"{athlete_id},{athlete_name},{gender},{dob},{country_code},{sports},{events}\n")

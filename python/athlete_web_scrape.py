import csv
import time
from playwright.sync_api import sync_playwright
from playwright_stealth import Stealth
from bs4 import BeautifulSoup

COUNTRY_CODES = ['ALB', 'AND', 'ARG', 'ARM', 'AUS', 'AUT', 'AZE', 'BEL', 'BEN', 'BOL', 'BIH', 'BRA', 'BUL', 'CAN', 'CHI', 'CHN', 'TPE', 'COL', 'CRO', 'CYP', 'CZE', 'DEN', 'ECU', 'ERI', 'EST', 'FIN', 'FRA', 'GEO', 'GER', 'GBR', 'GRE', 'GBS', 'HAI', 'HKG', 'HUN', 'ISL', 'IND', 'AIN', 'IRI', 'IRL', 'ISR', 'ITA', 'JAM', 'JPN', 'KAZ', 'KEN', 'KOS', 'KGZ', 'LAT', 'LBN', 'LIE', 'LTU', 'LUX', 'MAD', 'MAS', 'MLT', 'MEX', 'MDA', 'MON', 'MGL', 'MNE', 'MAR', 'NED', 'NZL', 'NGR', 'MKD', 'NOR', 'PAK', 'PHI', 'POL', 'POR', 'PUR', 'ROU', 'SMR', 'KSA', 'SRB', 'SGP', 'SVK', 'SLO', 'RSA', 'KOR', 'ESP', 'SWE', 'SUI', 'THA', 'TTO', 'TUR', 'UKR', 'UAE', 'USA', 'URU', 'UZB', 'VEN']
BASE_URL = "https://www.olympics.com/en/milano-cortina-2026/results/hubs/individuals?perPage=50"
error_log = open("error_log.txt", "a")

def run_scraper():
    seen_athletes = set()
    
    with sync_playwright() as p:
        browser = p.firefox.launch(headless=True) 
        context = browser.new_context(
            viewport={'width': 1280, 'height': 800},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
        )
        
        stealth_config = Stealth()
        page = context.new_page()
        stealth_config.apply_stealth_sync(page)

        with open("missing_athletes.csv", "w", newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(["name", "country_code", "gender", "sport", "events"])

            for country in COUNTRY_CODES:
                for gender in ["M", "F"]:
                    url = f"{BASE_URL}&gender={gender}&noc={country}"
                    
                    try:
                        print(f"scrapping: {country} - {gender}")
                        page.goto(url, wait_until="networkidle", timeout=60000)
                        page.wait_for_selector("tr", timeout=10000)
                        
                        soup = BeautifulSoup(page.content(), 'html.parser')
                        rows = soup.find_all('tr')
                        
                        new_entries = 0
                        for row in rows:
                            cells = row.find_all('td')
                            if len(cells) >= 3:
                                name_tag = row.select_one(".notranslate")
                                if not name_tag: continue
                                athlete_name = name_tag.get_text(strip=True)
                                actual_noc = cells[1].get_text(strip=True) if len(cells) > 1 else country
                                sport = cells[2].get_text(strip=True) if len(cells) > 2 else ""
                                ath_code_gender = (athlete_name.lower(), actual_noc.upper(), gender)
                                if ath_code_gender not in seen_athletes:
                                    events = cells[3].get_text("/", strip=True) if len(cells) > 3 else ""
                                    writer.writerow([athlete_name, country, gender, sport, events])
                                    seen_athletes.add(ath_code_gender)
                                    new_entries += 1
                        
                        if new_entries == 0:
                            print(f"No new athletes found")
                        else:
                            print(f"Added {new_entries} athletes.")
                                
                    except Exception as e:
                        print(f"Failed to find table for {country} {gender}")
                        error_log.write(f"Failed to find table for {country} {gender}\n")
                    
                    time.sleep(2) 
                f.flush()

        browser.close()
        print(f"Finished! Unique athletes: {len(seen_athletes)}")

if __name__ == "__main__":
    run_scraper()
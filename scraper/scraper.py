import json
import urllib.request
import urllib.error
import os
import time

# Paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_FILE = os.path.join(BASE_DIR, 'data', 'tools.json')

def load_data():
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def fetch_github_stats(repo_name):
    print(f"Fetching stats for {repo_name}...")
    url = f"https://api.github.com/repos/{repo_name}"
    req = urllib.request.Request(url)
    # GitHub requires a User-Agent
    req.add_header('User-Agent', 'Python-Urllib-Scraper')
    
    # Use GITHUB_TOKEN if available to avoid rate limits
    token = os.environ.get('GITHUB_TOKEN')
    if token:
        req.add_header('Authorization', f'token {token}')
    
    try:
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                return {
                    "stars": data.get("stargazers_count", 0),
                    "description": data.get("description", ""),
                    "last_commit": data.get("pushed_at", ""),
                    "language": data.get("language", ""),
                    "license": data.get("license", {}).get("name", "Unknown") if data.get("license") else "None"
                }
            else:
                print(f"Error fetching {repo_name}: {response.status}")
                return None
    except urllib.error.HTTPError as e:
        print(f"HTTP Error fetching {repo_name}: {e.code}")
        # If rate limited, print a warning
        if e.code == 403:
            print("Warning: API Rate limited. Use GITHUB_TOKEN for higher limits.")
        return None
    except Exception as e:
        print(f"Error fetching {repo_name}: {e}")
        return None

def main():
    tools = load_data()
    updated = False
    
    for tool in tools:
        if tool.get("is_open_source") and tool.get("github_repo"):
            stats = fetch_github_stats(tool["github_repo"])
            if stats:
                tool.update(stats)
                updated = True
            time.sleep(0.5) # Be nice to API, slightly faster with token
    
    # Save to root data folder
    with open(DATA_FILE, 'w') as f:
        json.dump(tools, f, indent=2)
    
    # Save to web data folder if it exists
    web_data_path = os.path.join(BASE_DIR, 'web', 'data', 'tools.json')
    if os.path.exists(os.path.dirname(web_data_path)):
        with open(web_data_path, 'w') as f:
            json.dump(tools, f, indent=2)
    
    if updated:
        print("Data updated successfully!")
    else:
        print("No updates found.")

if __name__ == "__main__":
    main()

import requests
from bs4 import BeautifulSoup 

def scrape_web(query, max_results=5):
    url = "https://lite.duckduckgo.com/lite/"
    params = {"q": query}
    
    try:
        response = requests.post(url, data=params)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Scraping error: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    results = []

    for result in soup.find_all("a", class_="result-link", limit=max_results):
        text = result.get_text(strip=True)
        href = result.get("href")
        results.append({
            "text": text,
            "url": href
        })
        

    return results

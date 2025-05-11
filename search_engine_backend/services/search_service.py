from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

from .squad_search import search_squad
from .web_scraper import scrape_web
from utils.embeddings_loader import load_embeddings

model = SentenceTransformer("all-MiniLM-L6-v2")

def hybrid_search(query, top_k=10):
    # Résultats SQuAD 
    squad_results = search_squad(query)
    for r in squad_results:
        r["source"] = "squad"

    # Résultats Web scraping 
    web_results = scrape_web(query)
    web_texts = [r["text"] for r in web_results]

    if web_texts:
        web_embeddings = model.encode(web_texts)
        query_embedding = model.encode([query])
        similarities = cosine_similarity(query_embedding, web_embeddings)[0]

        for i, r in enumerate(web_results):
            r["score"] = float(similarities[i])
            r["source"] = "web"

    combined = squad_results + web_results

    combined_sorted = sorted(combined, key=lambda x: x["score"], reverse=True)

    return combined_sorted[:top_k]

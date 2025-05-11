from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from utils.embeddings_loader import load_embeddings

model = SentenceTransformer("all-MiniLM-L6-v2")

def search_squad(query, top_k=5):
    try:
        # Chargement validé
        embeddings, texts = load_embeddings()
        
        # Vérification des dimensions
        if len(embeddings) != len(texts):
            raise ValueError("Incohérence embeddings/textes")
            
        # Encodage de la requête
        query_embedding = model.encode([query], convert_to_tensor=True)
        
        # Calcul de similarité
        similarities = cosine_similarity(query_embedding, embeddings)[0]
        top_indices = np.argsort(similarities)[::-1][:top_k]
        
        return [{
            "text": texts[i],
            "score": float(similarities[i]),
            "index": int(i)
        } for i in top_indices]
        
    except Exception as e:
        print(f"Erreur de recherche : {str(e)}")
        return []
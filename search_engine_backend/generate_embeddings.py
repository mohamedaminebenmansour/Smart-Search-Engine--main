import os
import json
import pickle
import pandas as pd
from sentence_transformers import SentenceTransformer
from tqdm import tqdm

# Configuration des chemins
BASE_DIR = os.path.dirname(os.path.abspath(__file__)) # Chemin du script
MAIN_DIR = os.path.abspath(os.path.join(BASE_DIR, "..")) # Remonte d'un niveau seulement
DATA_DIR = os.path.join(MAIN_DIR, "data") # Maintenant dans Smart-Search-Engine--main/data
INDEX_DIR = os.path.join(MAIN_DIR, "index")

CSV_PATH = os.path.join(DATA_DIR, "squad_train.csv")
JSON_PATH = os.path.join(DATA_DIR, "squad_train.json")
INDEX_PATH = os.path.join(INDEX_DIR, "context_embeddings.pkl")

def load_or_convert_dataset():
    """Charge le CSV ou convertit le JSON original si nécessaire"""
    if os.path.exists(CSV_PATH):
        return pd.read_csv(CSV_PATH)
    
    if os.path.exists(JSON_PATH):
        print("Conversion du JSON SQuAD en CSV...")
        with open(JSON_PATH) as f:
            data = json.load(f)
        
        contexts = []
        for article in data["data"]:
            for paragraph in article["paragraphs"]:
                contexts.append({"context": paragraph["context"]})
        
        df = pd.DataFrame(contexts)
        df.to_csv(CSV_PATH, index=False)
        return df
    
    raise FileNotFoundError(f"""
    Aucun fichier SQuAD trouvé dans {DATA_DIR}
    Placez soit :
    - {CSV_PATH}
    - {JSON_PATH}
    """)

try:
    # Initialisation modèle
    model = SentenceTransformer("all-MiniLM-L6-v2")
    
    # Vérification structure dossier
    os.makedirs(DATA_DIR, exist_ok=True)
    os.makedirs(INDEX_DIR, exist_ok=True)

    # Chargement données
    print(f"Recherche du dataset dans : {DATA_DIR}")
    df = load_or_convert_dataset()
    
    # Validation données
    if "context" not in df.columns:
        raise ValueError("Structure de données invalide - colonne 'context' manquante")
    
    # Nettoyage
    texts = df["context"].dropna().drop_duplicates().tolist()
    print(f"Contextes uniques à encoder : {len(texts)}")

    # Encodage
    embeddings = model.encode(
        texts,
        batch_size=256,
        show_progress_bar=True,
        convert_to_numpy=True,
        normalize_embeddings=True
    )

    # Sauvegarde
    with open(INDEX_PATH, "wb") as f:
        pickle.dump({
            "model": "all-MiniLM-L6-v2",
            "embeddings": embeddings,
            "texts": texts,
            "metadata": {
                "dataset": os.path.basename(CSV_PATH),
                "created": pd.Timestamp.now().isoformat(),
                "dimensions": embeddings.shape
            }
        }, f, protocol=pickle.HIGHEST_PROTOCOL)
    
    print(f"\n✅ Embeddings sauvegardés avec succès dans : {INDEX_PATH}")
    print(f"Taille fichier : {os.path.getsize(INDEX_PATH)/1e6:.2f} MB")
    print(f"Dimensions embeddings : {embeddings.shape}")

except Exception as e:
    print(f"\n❌ ERREUR : {str(e)}")
    print("Traceback complet :")
    import traceback
    traceback.print_exc()
    exit(1)
# src/create_index.py

import pandas as pd # type: ignore
from sentence_transformers import SentenceTransformer # type: ignore
import numpy as np # type: ignore
import pickle
import os

def create_index():
    df = pd.read_csv("data/squad_train_clean.csv")
    texts = df["context"].tolist()

    print("Chargement du modèle de transformation sémantique...")
    model = SentenceTransformer("all-MiniLM-L6-v2")  # rapide et performant

    print("🔧 Encodage des textes...")
    embeddings = model.encode(texts, show_progress_bar=True)

    print("Sauvegarde de l'index...")
    os.makedirs("index", exist_ok=True)
    with open("index/context_embeddings.pkl", "wb") as f:
        pickle.dump((embeddings, texts), f)

    print("Index intelligent créé avec succès !")

if __name__ == "__main__":
    create_index()

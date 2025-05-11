import pickle
import os
import numpy as np

def load_embeddings():
    path = "index/context_embeddings.pkl"
    
    if not os.path.exists(path):
        raise FileNotFoundError(f"Fichier {path} introuvable. Exécutez generate_embeddings.py")
    
    try:
        with open(path, "rb") as f:
            data = pickle.load(f)
            
            # Validation du format
            required_keys = {"model_name", "embeddings", "texts"}
            if not all(key in data for key in required_keys):
                raise ValueError("Format de fichier invalide")
                
            return data["embeddings"], data["texts"]
            
    except Exception as e:
        os.remove(path)  # Supprimer le fichier corrompu
        raise Exception(f"Fichier embeddings corrompu : {str(e)}. Régénérez les embeddings.")
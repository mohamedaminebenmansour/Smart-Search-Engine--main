import pickle
import numpy as np  # type: ignore

try:
    with open("index/context_embeddings.pkl", "rb") as f:
        data = pickle.load(f)

    print(f"Nombre de passages indexés : {len(data)}")

    # Affiche un exemple
    print("\nExemple :")
    
    # Vérifie si la liste n'est pas vide
    if len(data) == 0:
        print("Aucun élément dans les données.")
    else:
        print(f"Type de data[0] : {type(data[0])}")
        print(f"Contenu brut de data[0] : {data[0]}")

        # Vérifie que data[0] est bien un dictionnaire avec les clés attendues
        if isinstance(data[0], dict) and 'text' in data[0] and 'embedding' in data[0]:
            print("Texte :", data[0]['text'][:100], "...")
            print("Vecteur (dim) :", data[0]['embedding'][:5], "...")
        else:
            print("Format inattendu pour data[0].")
except FileNotFoundError:
    print("❌ Le fichier 'index/context_embeddings.pkl' est introuvable.")
except Exception as e:
    print(f"❌ Une erreur est survenue : {e}")


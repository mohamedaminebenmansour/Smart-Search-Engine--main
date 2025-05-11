# download_data.py

from datasets import load_dataset # type: ignore

def download_squad_dataset(save_path='../data'):
    """
    Télécharge le dataset SQuAD et enregistre les questions, contextes et réponses dans des fichiers CSV.
    """

    # Télécharger le dataset SQuAD
    dataset = load_dataset("squad")

    # On récupère l'ensemble d'entraînement
    train_set = dataset['train']

    # On convertit en liste de dictionnaires pour traitement facile
    documents = []
    for item in train_set:
        question = item['question']
        context = item['context']
        answer = item['answers']['text'][0] if item['answers']['text'] else ''

        documents.append({
            'question': question,
            'context': context,
            'answer': answer
        })

    # Sauvegarder dans un fichier CSV
    import pandas as pd # type: ignore
    import os

    os.makedirs(save_path, exist_ok=True)
    df = pd.DataFrame(documents)
    df.to_csv(f'{save_path}/squad_train.csv', index=False)

    print(f"Dataset téléchargé et sauvegardé dans {save_path}/squad_train.csv")

if __name__ == "__main__":
    download_squad_dataset()

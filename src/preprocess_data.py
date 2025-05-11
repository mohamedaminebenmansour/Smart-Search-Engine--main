# preprocess_data.py

import pandas as pd # type: ignore
import re

def clean_text(text):
    if not isinstance(text, str):
        return ""
    text = text.lower()
    text = re.sub(r'\n', ' ', text)
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def preprocess_dataset(input_csv='../data/squad_train.csv', output_csv='../data/squad_train_clean.csv'):
    """
    Charge les données, nettoie les colonnes 'question', 'context', 'answer',
    et sauvegarde dans un nouveau fichier CSV.
    """
    df = pd.read_csv(input_csv)

    # Nettoyer les colonnes
    df['question'] = df['question'].apply(clean_text)
    df['context'] = df['context'].apply(clean_text)
    df['answer'] = df['answer'].apply(clean_text)

    # Sauvegarder
    df.to_csv(output_csv, index=False)
    print(f"Dataset nettoyé sauvegardé dans {output_csv}")

if __name__ == "__main__":
    preprocess_dataset()

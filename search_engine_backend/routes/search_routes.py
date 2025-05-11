from flask import Blueprint, request, jsonify, current_app 
from services.search_service import hybrid_search 
from models.history_model import History
from models.user_model import User
from extensions import db
import jwt
import traceback

search_bp = Blueprint("search", __name__)

@search_bp.route('/search', methods=['POST', 'OPTIONS'], strict_slashes=False)
def search():
    current_app.logger.info("=== Début de la requête /search ===")
    current_app.logger.debug(f"Headers: {dict(request.headers)}")
    current_app.logger.debug(f"Données brutes: {request.get_data()}")

    if request.method == 'OPTIONS':
        current_app.logger.info("Réponse OPTIONS préflight CORS")
        return jsonify({}), 200

    try:
        # Debug du Content-Type
        if not request.is_json:
            current_app.logger.warning("Content-Type incorrect reçu: %s", request.content_type)
            
        data = request.get_json()
        current_app.logger.debug("Données JSON parsées: %s", data)
        
        if not data:
            current_app.logger.error("Aucune donnée JSON trouvée")
            return jsonify({"error": "Données JSON manquantes ou Content-Type incorrect."}), 400
        
        query = data.get("query", "").strip()
        current_app.logger.info("Requête reçue: '%s'", query)
        
        if not query:
            current_app.logger.warning("Requête vide reçue")
            return jsonify({"error": "Le champ 'query' est vide ou manquant."}), 400

        # Debug JWT
        current_user = None
        auth_header = request.headers.get('Authorization')
        current_app.logger.debug("En-tête Authorization: %s", auth_header)
        
        if auth_header and auth_header.startswith('Bearer '):
            try:
                token = auth_header.split(" ")[1]
                current_app.logger.debug("Token JWT reçu: %s", token)
                
                payload = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
                current_app.logger.debug("Payload JWT décodé: %s", payload)
                
                current_user = User.query.get(payload['user_id'])
                current_app.logger.info("Utilisateur authentifié: %s", current_user.id if current_user else None)
                
            except (jwt.ExpiredSignatureError, jwt.InvalidTokenError) as e:
                current_app.logger.warning("Erreur JWT: %s", str(e))
                pass

        # Debug base de données
        if current_user:
            try:
                current_app.logger.debug("Tentative de sauvegarde historique pour user_id: %s", current_user.id)
                history_entry = History(user_id=current_user.id, query=query)
                db.session.add(history_entry)
                db.session.commit()
                current_app.logger.info("Historique sauvegardé avec ID: %s", history_entry.id)
                
            except Exception as db_error:
                db.session.rollback()
                current_app.logger.error("Erreur DB: %s", str(db_error))
                current_app.logger.error("Traceback: %s", traceback.format_exc())

        # Debug recherche
        current_app.logger.info("Lancement de la recherche hybride...")
        try:
            results = hybrid_search(query)
            current_app.logger.debug("Résultats bruts: %s", str(results)[:500])  # Limite la sortie
        except Exception as search_error:
            current_app.logger.error("Erreur dans hybrid_search: %s", str(search_error))
            current_app.logger.error("Traceback: %s", traceback.format_exc())
            raise  # Pour déclencher le catch global

        current_app.logger.info("Recherche terminée avec %s résultats", len(results))
        return jsonify({"results": results})
    
    except Exception as e:
        current_app.logger.error("=== ERREUR CRITIQUE ===")
        current_app.logger.error("Type d'erreur: %s", type(e).__name__)
        current_app.logger.error("Message: %s", str(e))
        current_app.logger.error("Traceback complet:\n%s", traceback.format_exc())
        current_app.logger.error("Données de la requête: %s", request.get_data())
        current_app.logger.error("En-têtes: %s", dict(request.headers))
        return jsonify({"error": "Une erreur interne du serveur est survenue lors de la recherche."}), 500
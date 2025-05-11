from flask import Blueprint, request, jsonify
from extensions import db
from models.history_model import History
from models.favorite_model import Favorite
from utils.auth_utils import token_required
from sqlalchemy import select, delete

user_bp = Blueprint("user", __name__)

@user_bp.route('/history', methods=['GET'])
@token_required
def get_history(current_user):
    stmt = select(History).where(History.user_id == current_user.id).order_by(History.created_at.desc())
    history = db.session.scalars(stmt).all()
    return jsonify({"history": [{"query": h.query, "timestamp": h.created_at} for h in history]})

@user_bp.route('/favorites', methods=['GET', 'POST', 'DELETE'])
@token_required
def handle_favorites(current_user):
    if request.method == 'POST':
        data = request.get_json()
        content = data.get('content')
        
        if not content:
            return jsonify({"error": "Le contenu est requis"}), 400
        
        existing = Favorite.query.filter_by(user_id=current_user.id, content=content).first()
        if existing:
            return jsonify({"error": "Ce favori existe déjà"}), 409
            
        new_favorite = Favorite(user_id=current_user.id, content=content)
        db.session.add(new_favorite)
        db.session.commit()
        return jsonify({"message": "Favori ajouté avec succès"}), 201

    elif request.method == 'DELETE':
        data = request.get_json()
        favorite_id = data.get('favorite_id')
        
        if not favorite_id:
            return jsonify({"error": "ID du favori requis"}), 400
            
        stmt = delete(Favorite).where(
            (Favorite.id == favorite_id) & 
            (Favorite.user_id == current_user.id)
        )
        result = db.session.execute(stmt)
        db.session.commit()
        
        if result.rowcount == 0:
            return jsonify({"error": "Favori non trouvé"}), 404
            
        return jsonify({"message": "Favori supprimé avec succès"}), 200

    # GET
    stmt = select(Favorite).where(Favorite.user_id == current_user.id).order_by(Favorite.created_at.desc())
    favs = db.session.scalars(stmt).all()
    return jsonify({"favorites": [{"id": f.id, "content": f.content, "timestamp": f.created_at} for f in favs]})
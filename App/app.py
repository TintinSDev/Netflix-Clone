from flask import Flask, send_from_directory, send_file, request, jsonify
import json, requests
from flask_restful import Api
from models import Profile, Movie, User, db , ma
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash
import os
from os import environ


app = Flask(__name__)
api = Api(app)
# Init db

BASEDIR = os.path.join(os.path.dirname(__file__))

# Database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/netflix.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
CORS(app, origins="http://127.0.0.1:5173")

migrate = Migrate(app, db)
db.init_app(app)
ma.init_app(app)
with app.app_context():
    db.create_all()
    
@app.route('/')
def root():
    return send_file(os.path.join(BASEDIR,'static/index.html'))

@app.route('/<path:path>')
def static_assets(path):
    if os.path.exists(os.path.join(BASEDIR, 'static', path)):
        return send_from_directory (os.path.join(BASEDIR, 'static'), path)
    else:
        return send_from_directory (os.path.join(BASEDIR,'static/index.html'), path)



@app.route('/movies', methods=['OPTIONS'])
def handle_options():
    return jsonify(), 200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    }
    

@app.route('/payments', methods=['OPTIONS'])
def handle_payments_options():
    return jsonify(), 200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    }
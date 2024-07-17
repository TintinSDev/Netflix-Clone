from flask_marshmallow import Marshmallow
from flask import Flask
from flask_restful import Resource
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash

app = Flask(__name__)
db = SQLAlchemy()

# Init Marshmallow
ma = Marshmallow(app)   


# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    # role = db.Column(db.String(20), nullable=False)  # Admin or Bus Operator

    def check_password(self, password):
        return check_password_hash(self.password, password)

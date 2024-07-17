from flask import Flask, send_from_directory, session, send_file, request, jsonify, redirect, url_for
from flask_restful import Api
from models import  User, db , ma
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash
import os
import logging

from os import environ
import resend


from dotenv import load_dotenv
load_dotenv()

resend.api_key = os.environ["RESEND_API_KEY"] #export in the terminal export RESEND_API_KEY='re_YQT3zb5C_9pkqXYBdQWWKveUHqZGp57eW'
logging.basicConfig(level=logging.DEBUG)

resend.api_key = os.getenv("RESEND_API_KEY")

app = Flask(__name__)
api = Api(app)

#API_KEY = environ.get('RESEND_API_KEY')

# resend = Resend('re_MAmoPkk5_Dg4USAzdGwSoVGFNVZi434jA')

BASEDIR = os.path.join(os.path.dirname(__file__))

# Database connection
# For local connection
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:qwerty@localhost:2000/netflix'

# For remote connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:qwerty@38.182.86.186:2000/netflix'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
# CORS(app, origins="http://127.0.0.1:5173")

def use(req, res, next):
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()

app.use = use


migrate = Migrate(app, db)
db.init_app(app)
ma.init_app(app)
with app.app_context():
    db.create_all()
    
# @app.route('/')
# def root():
#     return send_file(os.path.join(BASEDIR,'static/index.html'))

# @app.route('/<path:path>')
# def static_assets(path):
#     if os.path.exists(os.path.join(BASEDIR, 'static', path)):
#         return send_from_directory (os.path.join(BASEDIR, 'static'), path)
#     else:
#         return send_from_directory (os.path.join(BASEDIR,'static/index.html'), path)


@app.route('/movies', methods=['OPTIONS'])
def handle_options():
    return jsonify(), 200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    }
    

@app.route('/send-email', methods=['OPTIONS'])
def handle_payments_options():
    return jsonify(), 200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    }
    
@app.route('/')
def index():
    return 'Welcome to Tinflix'

# @app.route('/send-email', methods=['POST'])
# def send_email():
#     params: resend.Emails.SendParams = {
#         "from": "TINFLIX <onboarding@martinmaina.dev>",
#         "to": ["mmaina290@gmail.com"],
#         "cc": ["ludhrk@gmail.com"],
#         "subject": "Welcome to Tinflix. ",
#         "html": "<strong>Welcome. Enjoy watching unlimited movies and TV shows on Tinflix. </strong>",
#     }

#     r = resend.Emails.send(params)
#     return jsonify(r)
print(dir(resend.emails))

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.get_json()
    email = data.get('email')

    if not email:
        return jsonify({"error": "Email is required"}), 400

    params: resend.Emails.SendParams  = {
        "from": "TINFLIX <ludhrk@gmail.com>",
        "to": [email],
        "cc": ["mmaina290@gmail.com"],
        "subject": "Welcome to Tinflix",
        "html":"<strong>Welcome to Tinflix!</strong>",
    }

    try:
        response = resend.Emails.SendParams(**params)  # Adjust this line based on the correct usage from the 'resend' module documentation
        return jsonify({"message": "Email sent successfully!", "response": response}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({"error": "Failed to send email"}), 500
@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        logging.debug(f"Received data: {data}")
    
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')


        if not username or not email or not password:
            return jsonify({'message': 'Username, email, and password are required'}), 400

        if User.query.filter_by(username=username).first():
            return jsonify({'message': 'Username already exists'}), 400

        hashed_password = generate_password_hash(password)  # Hash the password
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        print("User registered successfully!") #Debbuging statement
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        logging.error(f"Error during registration: {e}")
        return jsonify({'message': 'Internal Server Error'}), 500
    
    
# User login route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if not user or not user.check_password(password):  # Check password using check_password_hash
        return jsonify({'message': 'Invalid email or password'}), 401

    return jsonify({'message': 'Login successful'}), 200

@app.route('/logout')
def logout():
    # Clear the user's session information
    session.clear()
    return redirect(url_for('login'))

# api.add_resource(MoviesResource,  '/api/movies')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0')
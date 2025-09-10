from flask import Flask, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
import secrets
from functools import wraps
from config import Config
from datetime import datetime, timedelta

# --- App Initialization ---
# Auto-create the 'instance' folder if it doesn't exist
instance_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance')
os.makedirs(instance_path, exist_ok=True)

app = Flask(__name__)
app.config.from_object(Config)

# --- Extensions Initialization ---
CORS(app, resources={r"/*": {"origins": "*"}}) # Allow all for simplicity
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# --- Database Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(50), nullable=False, default='patient')
    # --- NEW FIELDS FOR PATIENT REGISTRATION ---
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    phone_number = db.Column(db.String(20), unique=True)
    village = db.Column(db.String(100))
    gender = db.Column(db.String(10))

class AuthToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    token = db.Column(db.String(64), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# --- Authentication Decorator ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            try: token = request.headers['Authorization'].split(" ")[1]
            except IndexError: return jsonify(message="Token is malformed!"), 401
        if not token: return jsonify(message="Token is missing!"), 401
        auth_token_entry = AuthToken.query.filter_by(token=token).first()
        if not auth_token_entry: return jsonify(message="Token is invalid!"), 401
        g.current_user = User.query.get(auth_token_entry.user_id)
        return f(*args, **kwargs)
    return decorated

# --- Authentication Routes ---
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        token = secrets.token_hex(32)
        # Remove old tokens for this user
        AuthToken.query.filter_by(user_id=user.id).delete()
        new_auth = AuthToken(token=token, user_id=user.id)
        db.session.add(new_auth)
        db.session.commit()
        user_data = {'id': user.id, 'email': user.email, 'role': user.role, 'name': user.first_name}
        return jsonify(message="Login successful", token=token, user=user_data), 200
    else:
        return jsonify(message="Invalid email or password"), 401

# --- NEW REGISTRATION ROUTE ---
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify(message="No input data provided"), 400

    if User.query.filter_by(email=data.get('email')).first():
        return jsonify(message="User with this email already exists"), 409
    if User.query.filter_by(phone_number=data.get('phone')).first():
        return jsonify(message="User with this phone number already exists"), 409

    hashed_password = bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
    new_user = User(
        email=data.get('email'),
        password=hashed_password,
        first_name=data.get('firstName'),
        last_name=data.get('lastName'),
        phone_number=data.get('phone'),
        village=data.get('village'),
        gender=data.get('gender')
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(message="User registered successfully"), 201


# --- Protected Routes (for doctor portal) ---
@app.route('/doctor/dashboard', methods=['GET'])
@token_required
def doctor_dashboard():
    # ... (code for this route is unchanged)
    if g.current_user.role != 'doctor': return jsonify(message="Access forbidden: Doctors only"), 403
    mock_stats = { "todays_appointments": 2, "total_patients": 124, "pending_reports": 3 }
    mock_appointments = [
        { "id": 1, "patient_name": "Ramesh Kumar", "time": (datetime.now() + timedelta(hours=2)).isoformat(), "reason": "Follow-up Checkup" },
        { "id": 2, "patient_name": "Priya Sharma", "time": (datetime.now() + timedelta(hours=4)).isoformat(), "reason": "New Consultation" }
    ]
    return jsonify({ "stats": mock_stats, "appointments": mock_appointments }), 200


# --- App Setup and Run ---
def create_demo_user():
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(email='test@test.com').first():
            hashed_password = bcrypt.generate_password_hash('password').decode('utf-8')
            demo_user = User(email='test@test.com', password=hashed_password, role='doctor', first_name='Aditya')
            db.session.add(demo_user)
            db.session.commit()

if __name__ == '__main__':
    create_demo_user()
    app.run(debug=True, port=5000)


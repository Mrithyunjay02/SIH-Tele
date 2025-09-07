from flask import Flask, request, jsonify, g
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
import secrets
from functools import wraps
from config import Config
from datetime import datetime, timedelta

# --- App Initialization & Folder Creation ---
# This ensures the 'instance' folder exists before the app runs
instance_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'instance')
os.makedirs(instance_path, exist_ok=True)

app = Flask(__name__)
app.config.from_object(Config)

# --- Extensions Initialization ---
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

# --- Database Models ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(100), nullable=True)

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
            token = request.headers['Authorization'].split(" ")[1]
        if not token:
            return jsonify(message="Token is missing!"), 401
        
        auth_token_entry = AuthToken.query.filter_by(token=token).first()
        if not auth_token_entry:
            return jsonify(message="Token is invalid!"), 401
            
        g.current_user = User.query.get(auth_token_entry.user_id)
        return f(*args, **kwargs)
    return decorated

# --- API Routes ---
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    
    if user and bcrypt.check_password_hash(user.password, data.get('password')):
        token = secrets.token_hex(32)
        # Remove old tokens for the user to keep the table clean
        AuthToken.query.filter_by(user_id=user.id).delete()
        new_auth = AuthToken(token=token, user_id=user.id)
        db.session.add(new_auth)
        db.session.commit()
        
        user_data = {'id': user.id, 'email': user.email, 'role': user.role, 'name': user.name}
        return jsonify(message="Login successful", token=token, user=user_data), 200
    else:
        return jsonify(message="Invalid email or password"), 401

@app.route('/doctor/dashboard', methods=['GET'])
@token_required
def doctor_dashboard():
    if g.current_user.role != 'doctor':
        return jsonify(message="Access forbidden: Doctors only"), 403
    
    now = datetime.now()
    mock_stats = { "todays_appointments": 2, "total_patients": 124, "pending_reports": 3 }
    mock_appointments = [
        { "id": 1, "patient_name": "Ramesh Kumar", "time": (now + timedelta(hours=2)).isoformat(), "reason": "Follow-up Checkup" },
        { "id": 2, "patient_name": "Priya Sharma", "time": (now + timedelta(hours=4)).isoformat(), "reason": "New Consultation" }
    ]
    response_data = { "stats": mock_stats, "appointments": mock_appointments }
    
    return jsonify(response_data), 200

# --- NEW PATIENTS ROUTE ---
@app.route('/doctor/patients', methods=['GET'])
@token_required
def get_patients():
    if g.current_user.role != 'doctor':
        return jsonify(message="Access forbidden: Doctors only"), 403

    # For the hackathon, we send mock data. In a real app, you'd query the database.
    mock_patients = [
        {"id": 101, "name": "Ramesh Kumar", "age": 45, "gender": "Male", "last_visit": "2025-08-15"},
        {"id": 102, "name": "Priya Sharma", "age": 32, "gender": "Female", "last_visit": "2025-08-20"},
        {"id": 103, "name": "Sanjay Verma", "age": 51, "gender": "Male", "last_visit": "2025-09-01"},
        {"id": 104, "name": "Anjali Gupta", "age": 28, "gender": "Female", "last_visit": "2025-09-02"},
        {"id": 105, "name": "Vikram Singh", "age": 60, "gender": "Male", "last_visit": "2025-08-25"},
    ]
    
    return jsonify(mock_patients), 200

# --- App Setup and Run ---
def create_demo_user():
    with app.app_context():
        db.create_all()
        if not User.query.filter_by(email='test@test.com').first():
            hashed_password = bcrypt.generate_password_hash('password').decode('utf-8')
            demo_user = User(email='test@test.com', password=hashed_password, role='doctor', name='Aditya')
            db.session.add(demo_user)
            db.session.commit()

if __name__ == '__main__':
    create_demo_user()
    app.run(debug=True)


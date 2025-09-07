# app/auth/auth.py
import os
import secrets
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask import request, jsonify
from app.auth.jwt_handler import generate_token
from app.auth.validators import VALID_ROLES
from app.extensions import db
from app.models.user_model import User
from email_validator import validate_email, EmailNotValidError
from app.notifications.email_service import send_password_reset_email

# --- Constants for better readability and maintainability ---
ALLOWED_REGISTER_FIELDS = {"name", "email", "password", "role", "admin_secret"}
REQUIRED_REGISTER_FIELDS = {"name", "email", "password", "role"}
RESET_TOKEN_LIFETIME_HOURS = 1 # Define how long the reset link is valid

def _validate_registration_data(data):
    """
    Performs field and basic data validation for user registration.
    Returns a tuple: (error_response, status_code) or (None, None) on success.
    """
    # 🔍 Step 1: Check for unexpected fields
    extra_fields = set(data.keys()) - ALLOWED_REGISTER_FIELDS
    if extra_fields:
        return jsonify({"error": f"Unexpected fields: {', '.join(extra_fields)}"}), 400

    # 🔍 Step 2: Check for missing required fields
    missing_fields = REQUIRED_REGISTER_FIELDS - set(data.keys())
    if missing_fields:
        return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
    
    email = data.get("email", "").strip().lower()
    role = data.get("role", "").lower()
    
    # ✅ Step 3: Validate email format
    try:
        validate_email(email)
    except EmailNotValidError as e:
        return jsonify({"error": str(e)}), 400

    # ✅ Step 4: Role validation
    if role not in VALID_ROLES:
        return jsonify({"message": f"Invalid role. Valid roles: {', '.join(VALID_ROLES)}"}), 400

    return None, None


def register_user():
    """Handles new user registration with robust validation and security checks."""
    data = request.get_json()

    # Consolidate validation into a helper function for a cleaner main function
    error_response, status_code = _validate_registration_data(data)
    if error_response:
        return error_response, status_code

    name = data.get("name")
    email = data.get("email").strip().lower()
    password = str(data.get("password", ""))  # ✅ Ensure password is treated as a string
    role = data.get("role", "").lower()
    admin_secret = data.get("admin_secret")

    # ✅ Step 5: Admin/Doctor role protection (Consolidated logic)
    # Only 'patient' can register without the admin secret.
    if role != "patient":
        true_secret = os.getenv("ADMIN_SECRET")
        if not true_secret or admin_secret != true_secret:
            return jsonify({"error": f"Unauthorized to register as {role}"}), 403

    # ✅ Step 6: Email uniqueness check
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    # ✅ Step 7: Secure password hashing
    hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')

    # ✅ Step 8: Create and save the new user
    new_user = User(name=name, email=email, password=hashed_pw, role=role)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": f"{role.capitalize()} registered successfully!"}), 201


def login_user():
    """Handles user login and token generation."""
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    # ✅ Step 1: Basic input validation
    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    # ✅ Step 2: Retrieve user by email
    user = User.query.filter_by(email=email.strip().lower()).first()
    if not user:
        return jsonify({"error": "Email does not exist"}), 401

    # ✅ Step 3: Verify password
    if not check_password_hash(user.password, password):
        return jsonify({"error": "Incorrect password"}), 401

    # ✅ Step 4: Generate and return JWT token
    token = generate_token(user.id, user.role)

    return jsonify({
        "token": token,
        "role": user.role,
        "name": user.name,
        "user_id": user.id
    }), 200


def forgot_password():
    """
    Handles the request to initiate a password reset.
    Generates a unique token and sends a password reset link.
    """
    data = request.get_json()
    email = data.get("email", "").strip().lower()

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()

    # Security measure: Always return a non-specific success message to prevent email enumeration.
    if user:
        # Generate a secure, URL-safe token
        token = secrets.token_urlsafe(32)
        
        # Set token expiration
        token_expiration = datetime.datetime.now() + datetime.timedelta(hours=RESET_TOKEN_LIFETIME_HOURS)

        # Update the user record with the new token and expiration
        user.reset_token = token
        user.reset_token_expiration = token_expiration
        db.session.commit()

        # Construct the full reset URL using an environment variable for security and maintainability
        base_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
        reset_link = f"{base_url}/reset-password?token={token}"

        send_password_reset_email(user.email, reset_link)

    return jsonify({"message": "If an account with that email exists, a password reset link has been sent."}), 200


def reset_password():
    """
    Handles the password reset request.
    Validates the token, updates the password, and invalidates the token.
    """
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("newPassword")

    if not token or not new_password:
        return jsonify({"error": "Token and new password are required"}), 400

    # Find the user by the token
    user = User.query.filter_by(reset_token=token).first()

    if not user or user.reset_token_expiration < datetime.datetime.now():
        # Invalidate the token if it's expired or invalid to prevent future attempts
        if user:
            user.reset_token = None
            user.reset_token_expiration = None
            db.session.commit()
        return jsonify({"error": "Invalid or expired token."}), 400

    # Hash the new password and update the user record
    hashed_password = generate_password_hash(new_password, method='pbkdf2:sha256')
    user.password = hashed_password
    
    # Invalidate the token immediately after a successful reset
    user.reset_token = None
    user.reset_token_expiration = None
    db.session.commit()

    return jsonify({"message": "Password has been successfully reset."}), 200

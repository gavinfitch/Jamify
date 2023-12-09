from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user
from sqlalchemy import or_
from app.forms import LoginForm, SignUpForm
from app.models import User, db

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    # Function that turns the WTForms validation errors into a list
    error_messages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            error_messages.append(f'{field} : {error}')
    return error_messages


@auth_routes.route('/')
def authenticate():
    # Authenticates a user
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    # Logs a user in
    form = LoginForm()
    # Add csrf_token to form so validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Add the user to the session and login
        user = User.query.filter(or_(User.email == form.data['credential'], User.username == form.data['credential'])).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    # Logs a user out
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    # Creates a new user and logs them in
    form = SignUpForm()
    # Add csrf_token to form so validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # Create a new user, add them to the database, save, and log them in
        user = User(
            full_name=form.data['name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            photo_URL=form.data['photo_URL'],
            photo_s3Name=form.data['photo_s3Name']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    # Returns unauthorized JSON when flask-login authentication fails
    return {'errors': ['Unauthorized']}, 401

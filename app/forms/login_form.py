from flask_wtf import FlaskForm
from sqlalchemy import or_
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import User


def user_exists(form, field):
    # Checks if a user exists
    credential = field.data
    user = User.query.filter(or_(User.email == credential, User.username == credential)).first()
    if not user:
        raise ValidationError('Email or username not found')


def password_matches(form, field):
    # Checks if password is correct for provided credential (email or username)
    password = field.data
    user = User.query.filter(or_(User.email == form.data['credential'], User.username == form.data['credential'])).first()
    if user and not user.check_password(password):
        raise ValidationError('Incorrect password')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired(), user_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])

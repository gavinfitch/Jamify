from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def email_exists(form, field):
    # Checks if an email already exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address already in use')


def username_exists(form, field):
    # Checks if a username already exists
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username already in use')


class SignUpForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), Email(), email_exists])
    password = StringField('password', validators=[DataRequired()])
    photo_URL = StringField('photo_URL', validators=[DataRequired()])
    photo_s3Name = StringField('photo_s3Name')
    
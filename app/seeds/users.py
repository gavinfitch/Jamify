from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    guest = User(
        full_name='Guest User', username='Guest', email='guest@user.com', password='Guest123!@#', photo_URL="https://friendstagram.s3.us-west-2.amazonaws.com/utils/british-bulldog-brown-white-portrait-studio-underbite.jpg")
    gavin = User(
        full_name='Gavin Fitch', username='gavinfitch', email='gavin@gavin.com', password='password', photo_URL='https://jamify.s3.us-west-2.amazonaws.com/utils/Hornby_ferry.jpg')
    vini = User(
        full_name='Vini Reilly', username='vinireilly', email='vini@vini.com', password='password', photo_URL="https://jamify.s3.us-west-2.amazonaws.com/utils/default_user_profile_image.png")
    michelle = User(
        full_name='Michelle Stone', username='michellestone', email='michelle@michelle.com', password='password', photo_URL="https://jamify.s3.us-west-2.amazonaws.com/utils/default_user_profile_image.png")
    rafa = User(
        full_name='Rafa Thechi', username='rafathechi', email='rafa@rafa.com', password='password', photo_URL="https://jamify.s3.us-west-2.amazonaws.com/utils/default_user_profile_image.png")
    ace = User(
        full_name='Ace Kieffer', username='acekieffer', email='ace@ace.com', password='password', photo_URL="https://jamify.s3.us-west-2.amazonaws.com/utils/default_user_profile_image.png")

    db.session.add(guest)
    db.session.add(gavin)
    db.session.add(vini)
    db.session.add(michelle)
    db.session.add(rafa)
    db.session.add(ace)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    guest = User(
        full_name='Guest User', username='Guest', email='guest@user.com', password='password')
    gavin = User(
        full_name='Gavin Fitch', username='gavinfitch', email='gavin@gavin.com', password='password')
    vini = User(
        full_name='Vini Reilly', username='vinireilly', email='vini@vini.com', password='password')
    michelle = User(
        full_name='Michelle Stone', username='michellestone', email='michelle@michelle.com', password='password')
    rafa = User(
        full_name='Rafa Thechi', username='rafathechi', email='rafa@rafa.com', password='password')
    ace = User(
        full_name='Ace Kieffer', username='acekieffer', email='ace@ace.com', password='password')

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
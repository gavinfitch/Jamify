from app.models import db, Playlist


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    june_electronic = Playlist(
        userId=2,
        title='june electronic')

    db.session.add(june_electronic)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_playlists():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
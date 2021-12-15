from app.models import db, playlist_songs
from sqlalchemy import insert


# Adds a demo user, you can add other users here if you want
def seed_playlist_songs():
    juneElec1 = insert(playlist_songs).values(
        song_id= 4,
        playlist_id= 1
    )
    juneElec2 = insert(playlist_songs).values(
        song_id= 13,
        playlist_id= 1
    )
    juneElec3 = insert(playlist_songs).values(
        song_id= 7,
        playlist_id= 1
    )
    juneElec4 = insert(playlist_songs).values(
        song_id= 6,
        playlist_id= 1
    )
    juneElec5 = insert(playlist_songs).values(
        song_id= 8,
        playlist_id= 1
    )
    juneElec6 = insert(playlist_songs).values(
        song_id= 12,
        playlist_id= 1
    )
    juneElec7 = insert(playlist_songs).values(
        song_id= 5,
        playlist_id= 1
    )
    juneElec8 = insert(playlist_songs).values(
        song_id= 2,
        playlist_id= 1
    )
    juneElec9 = insert(playlist_songs).values(
        song_id= 9,
        playlist_id= 1
    )
    juneElec10 = insert(playlist_songs).values(
        song_id= 11,
        playlist_id= 1
    )
    juneElec11 = insert(playlist_songs).values(
        song_id= 1,
        playlist_id= 1
    )

    db.session.execute(juneElec1)
    db.session.execute(juneElec2)
    db.session.execute(juneElec3)
    db.session.execute(juneElec4)
    db.session.execute(juneElec5)
    db.session.execute(juneElec6)
    db.session.execute(juneElec7)
    db.session.execute(juneElec8)
    db.session.execute(juneElec9)
    db.session.execute(juneElec10)
    db.session.execute(juneElec11)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_playlist_songs():
    db.session.execute('TRUNCATE playlist_songs RESTART IDENTITY CASCADE;')
    db.session.commit()
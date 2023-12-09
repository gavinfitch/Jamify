from app.models import db, playlist_songs
from sqlalchemy import insert


# Adds a demo user, you can add other users here if you want
def seed_playlist_songs():

    # Guest User's playlist-songs 
    # july electronic -
    julyElec1 = insert(playlist_songs).values(
        song_id=4,
        playlist_id=1
    )
    julyElec2 = insert(playlist_songs).values(
        song_id=13,
        playlist_id=1
    )
    julyElec3 = insert(playlist_songs).values(
        song_id=7,
        playlist_id=1
    )
    julyElec4 = insert(playlist_songs).values(
        song_id=6,
        playlist_id=1
    )
    julyElec5 = insert(playlist_songs).values(
        song_id=8,
        playlist_id=1
    )
    julyElec6 = insert(playlist_songs).values(
        song_id=12,
        playlist_id=1
    )
    julyElec7 = insert(playlist_songs).values(
        song_id=5,
        playlist_id=1
    )
    julyElec8 = insert(playlist_songs).values(
        song_id=2,
        playlist_id=1
    )
    julyElec9 = insert(playlist_songs).values(
        song_id=9,
        playlist_id=1
    )
    julyElec10 = insert(playlist_songs).values(
        song_id= 11,
        playlist_id=1
    )
    julyElec11 = insert(playlist_songs).values(
        song_id=1,
        playlist_id=1
    )
    # wind down -
    windDown1 = insert(playlist_songs).values(
        song_id=22,
        playlist_id=2
    )
    windDown2 = insert(playlist_songs).values(
        song_id=2,
        playlist_id=2
    )
    windDown3 = insert(playlist_songs).values(
        song_id=1,
        playlist_id=2
    )
    windDown4 = insert(playlist_songs).values(
        song_id=6,
        playlist_id=2
    )
    windDown5 = insert(playlist_songs).values(
        song_id=3,
        playlist_id=2
    )

    # Gavin Fitch's playlist-songs 
    # Rock playlist -
    rock1 = insert(playlist_songs).values(
        song_id=16,
        playlist_id=3
    )
    rock2 = insert(playlist_songs).values(
        song_id=18,
        playlist_id=3
    )
    rock3 = insert(playlist_songs).values(
        song_id=19,
        playlist_id=3
    )
    rock4 = insert(playlist_songs).values(
        song_id=20,
        playlist_id=3
    )
    rock5 = insert(playlist_songs).values(
        song_id= 7,
        playlist_id= 2
    )
    rock6 = insert(playlist_songs).values(
        song_id=22,
        playlist_id=3
    )


    db.session.execute(julyElec1)
    db.session.execute(julyElec2)
    db.session.execute(julyElec3)
    db.session.execute(julyElec4)
    db.session.execute(julyElec5)
    db.session.execute(julyElec6)
    db.session.execute(julyElec7)
    db.session.execute(julyElec8)
    db.session.execute(julyElec9)
    db.session.execute(julyElec10)
    db.session.execute(julyElec11)
    db.session.execute(windDown1)
    db.session.execute(windDown2)
    db.session.execute(windDown3)
    db.session.execute(windDown4)
    db.session.execute(windDown5)
    db.session.execute(rock1)
    db.session.execute(rock2)
    db.session.execute(rock3)
    db.session.execute(rock4)
    db.session.execute(rock5)
    db.session.execute(rock6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this.
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities.
def undo_playlist_songs():
    db.session.execute('TRUNCATE playlist_songs RESTART IDENTITY CASCADE;')
    db.session.commit()

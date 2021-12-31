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

    # db.session.execute(juneElec1)
    # db.session.execute(juneElec2)
    # db.session.execute(juneElec3)
    # db.session.execute(juneElec4)
    # db.session.execute(juneElec5)
    # db.session.execute(juneElec6)
    # db.session.execute(juneElec7)
    # db.session.execute(juneElec8)
    # db.session.execute(juneElec9)
    # db.session.execute(juneElec10)
    # db.session.execute(juneElec11)
    # db.session.commit()


    # Guest playlist-songs

    julyElec1 = insert(playlist_songs).values(
        song_id= 4,
        playlist_id= 3
    )
    julyElec2 = insert(playlist_songs).values(
        song_id= 13,
        playlist_id= 3
    )
    julyElec3 = insert(playlist_songs).values(
        song_id= 7,
        playlist_id= 3
    )
    julyElec4 = insert(playlist_songs).values(
        song_id= 6,
        playlist_id= 3
    )
    julyElec5 = insert(playlist_songs).values(
        song_id= 8,
        playlist_id= 3
    )
    julyElec6 = insert(playlist_songs).values(
        song_id= 12,
        playlist_id= 3
    )
    julyElec7 = insert(playlist_songs).values(
        song_id= 5,
        playlist_id= 3
    )
    julyElec8 = insert(playlist_songs).values(
        song_id= 2,
        playlist_id= 3
    )
    julyElec9 = insert(playlist_songs).values(
        song_id= 9,
        playlist_id= 3
    )
    julyElec10 = insert(playlist_songs).values(
        song_id= 11,
        playlist_id= 3
    )
    julyElec11 = insert(playlist_songs).values(
        song_id= 1,
        playlist_id= 3
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
    db.session.commit()


    running1 = insert(playlist_songs).values(
        song_id= 16,
        playlist_id= 4
    )
    running2 = insert(playlist_songs).values(
        song_id= 17,
        playlist_id= 4
    )
    running3 = insert(playlist_songs).values(
        song_id= 22,
        playlist_id= 4
    )
    running4 = insert(playlist_songs).values(
        song_id= 19,
        playlist_id= 4
    )
    running5 = insert(playlist_songs).values(
        song_id= 15,
        playlist_id= 4
    )
    running6 = insert(playlist_songs).values(
        song_id= 29,
        playlist_id= 4
    )
    running7 = insert(playlist_songs).values(
        song_id= 25,
        playlist_id= 4
    )
    running8 = insert(playlist_songs).values(
        song_id= 5,
        playlist_id= 4
    )
    running9 = insert(playlist_songs).values(
        song_id= 4,
        playlist_id= 4
    )

    # db.session.execute(running1)
    # db.session.execute(running2)
    # db.session.execute(running3)
    # db.session.execute(running4)
    # db.session.execute(running5)
    # db.session.execute(running6)
    # db.session.execute(running7)
    # db.session.execute(running8)
    # db.session.execute(running9)
    # db.session.commit()


    rock1 = insert(playlist_songs).values(
        song_id= 27,
        playlist_id= 3
    )
    rock2 = insert(playlist_songs).values(
        song_id= 28,
        playlist_id= 3
    )
    rock3 = insert(playlist_songs).values(
        song_id= 21,
        playlist_id= 3
    )
    rock4 = insert(playlist_songs).values(
        song_id= 29,
        playlist_id= 3
    )
    rock5 = insert(playlist_songs).values(
        song_id= 7,
        playlist_id= 3
    )
    rock6 = insert(playlist_songs).values(
        song_id= 13,
        playlist_id= 3
    )
    rock7 = insert(playlist_songs).values(
        song_id= 15,
        playlist_id= 3
    )
    rock8 = insert(playlist_songs).values(
        song_id= 22,
        playlist_id= 3
    )
    rock9 = insert(playlist_songs).values(
        song_id= 31,
        playlist_id= 3
    )
    rock10 = insert(playlist_songs).values(
        song_id= 26,
        playlist_id= 3
    )

    # db.session.execute(rock1)
    # db.session.execute(rock2)
    # db.session.execute(rock3)
    # db.session.execute(rock4)
    # db.session.execute(rock5)
    # db.session.execute(rock6)
    # db.session.execute(rock7)
    # db.session.execute(rock8)
    # db.session.execute(rock9)
    # db.session.execute(rock10)
    # db.session.commit()


    windDown1 = insert(playlist_songs).values(
        song_id= 22,
        playlist_id= 1
    )
    windDown2 = insert(playlist_songs).values(
        song_id= 2,
        playlist_id= 1
    )
    windDown3 = insert(playlist_songs).values(
        song_id= 1,
        playlist_id= 1
    )
    windDown4 = insert(playlist_songs).values(
        song_id= 6,
        playlist_id= 1
    )
    windDown5 = insert(playlist_songs).values(
        song_id= 3,
        playlist_id= 1
    )

    db.session.execute(windDown1)
    db.session.execute(windDown2)
    db.session.execute(windDown3)
    db.session.execute(windDown4)
    db.session.execute(windDown5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_playlist_songs():
    db.session.execute('TRUNCATE playlist_songs RESTART IDENTITY CASCADE;')
    db.session.commit()
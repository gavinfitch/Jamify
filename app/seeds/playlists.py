from app.models import db, Playlist


# Adds a demo user, you can add other users here if you want
def seed_playlists():
    june_electronic = Playlist(
        userId=2,
        title='june electronic')

    # db.session.add(june_electronic)

    # db.session.commit()

    # Guest playlists

    july_electronic = Playlist(
        userId=1,
        title='july electronic',
        coverPhoto_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/SpeedyJ/WarpAI_cover.jpeg")

    running = Playlist(
        userId=1,
        title='Running',
        coverPhoto_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/LouReed/LouReed_ConeyIslandBaby_cover.jpeg")

    rock_playlist = Playlist(
        userId=1,
        title='Rock playlist',
        coverPhoto_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/YoLaTengo/YoLaTengo_Painful_cover.png")

    wind_down = Playlist(
        userId=1,
        title='wind down',
        coverPhoto_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/BrianEno/BrianEno_Apollo_cover.jpeg")

    db.session.add(wind_down)
    db.session.add(rock_playlist)
    # db.session.add(running)
    db.session.add(july_electronic)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_playlists():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
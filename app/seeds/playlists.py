from app.models import db, Playlist


# Adds a demo user, you can add other users here if you want
def seed_playlists():

    # Guest User's playlists
    july_electronic = Playlist(
        userId=1,
        title='july electronic',
        coverPhoto_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/SpeedyJ/WarpAI_cover.jpeg")
    wind_down = Playlist(
        userId=1,
        title='wind down',
        coverPhoto_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/BrianEno/BrianEno_Apollo_cover.jpeg")
    
    # Gavin Fitch's playlists
    rock_playlist = Playlist(
        userId=2,
        title='Rock playlist',
        coverPhoto_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/YoLaTengo/YoLaTengo_Painful_cover.png")


    db.session.add(july_electronic) # Id: 1...
    db.session.add(wind_down) # Id: 2...
    db.session.add(rock_playlist) #Id: 3... etc.

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this.
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities.
def undo_playlists():
    db.session.execute('TRUNCATE playlists RESTART IDENTITY CASCADE;')
    db.session.commit()

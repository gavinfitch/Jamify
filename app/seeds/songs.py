from app.models import db, Song


# Adds a demo user, you can add other users here if you want
def seed_songs():

    eno_deepBlueDay = Song(
        userId=2, 
        title='Deep Blue Day', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/BrianEno/BrianEno_DeepBlueDay.mp3',
        album='Apollo: Atmospheres and Soundtracks', 
        artist='Brian Eno',
        genre='Ambient',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/BrianEno/BrianEno_Apollo_cover.jpeg')
    eno_silverMorning = Song(
        userId=2, 
        title='Silver Morning', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/BrianEno/BrianEno_SilverMorning.mp3',
        album='Apollo: Atmospheres and Soundtracks', 
        artist='Brian Eno',
        genre='Ambient',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/BrianEno/BrianEno_Apollo_cover.jpeg')
    eno_anEnding = Song(
        userId=2, 
        title='An Ending (Ascent)', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/BrianEno/BrianEno_AnEnding(Ascent).mp3',
        album='Apollo: Atmospheres and Soundtracks', 
        artist='Brian Eno',
        genre='Ambient',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/BrianEno/BrianEno_Apollo_cover.jpeg')
    aphex_xtal = Song(
        userId=2, 
        title='Xtal', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/AphexTwin/AphexTwin+_Xtal.mp3',
        album='Selected Ambient Works 85–92', 
        artist='Aphex Twin',
        genre='Electronic',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/AphexTwin/Selected_Ambient_Works_85-92_cover.png')
    aphex_heliosphan = Song(
        userId=2, 
        title='Heliosphan', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/AphexTwin/AphexTwin+_Heliosphan.mp3',
        album='Selected Ambient Works 85–92', 
        artist='Aphex Twin',
        genre='Electronic',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/AphexTwin/Selected_Ambient_Works_85-92_cover.png')
    myBloodyValentine_toHere = Song(
        userId=2, 
        title='To Here Knows When (EP Version)', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/MyBloodyValentine/MyBloodyValentine_ToHereKnowsWhen(EPVersion).mp3',
        album='Tremolo', 
        artist='My Bloody Valentine',
        genre='Shoegaze',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/MyBloodyValentine/MyBloodyValentine_Tremolo_cover.jpg')
    myBloodyValentine_swallow = Song(
        userId=2, 
        title='Swallow (EP Version)', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/MyBloodyValentine/MyBloodyValentine_Swallow(EP_Version).mp3',
        album='Tremolo', 
        artist='My Bloody Valentine',
        genre='Shoegaze',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/MyBloodyValentine/MyBloodyValentine_Tremolo_cover.jpg')
    martinRev_mari = Song(
        userId=2, 
        title='Mari', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/MartinRev/MartinRev_Mari.mp3',
        album='Martin Rev', 
        artist='Martin Rev',
        genre='Electronic',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/MartinRev/MartinRev_cover.jpg')
    speedyJ_deOrbit = Song(
        userId=2, 
        title='De-Orbit', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/SpeedyJ/SpeedyJ+_De-Orbit.mp3',
        album='Artificial Intelligence', 
        artist='Speedy J',
        genre='Electronic',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/SpeedyJ/WarpAI_cover.jpeg')
    broadcast_tears = Song(
        userId=2, 
        title='Tears In The Typing Pool', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/Broadcast/Broadcast+_TearsInTheTypingPool.mp3',
        album='Tender Buttons', 
        artist='Broadcast',
        genre='Pop',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/Broadcast/Broadcast_TenderButtons_cover.jpeg')
    broadcast_iFound = Song(
        userId=2, 
        title='I Found The F', 
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/Broadcast/Broadcast_IFoundTheF.mp3',
        album='Tender Buttons', 
        artist='Broadcast',
        genre='Pop',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/Broadcast/Broadcast_TenderButtons_cover.jpeg')
    cocteau_lorelei = Song(
        userId=2,
        title='Lorelei',
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/CocteauTwins/CocteauTwins_Lorelei.mp3',
        album='Treasure',
        artist='Cocteau Twins',
        genre='Pop',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/CocteauTwins/CocteauTwins_Treasure_cover.jpeg')

    durutti_sketch = Song(
        userId=3,
        title='Sketch for Summer',
        song_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/TheDuruttiColumn/TheDuruttiColumn_SketchforSummer.mp3',
        album='The Return of the Durutti Column',
        artist='The Durutti Column',
        genre='Rock',    
        albumCover_URL='https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/TheDuruttiColumn/Durutti_Column_cover.jpeg')

    
    db.session.add(eno_deepBlueDay)
    db.session.add(eno_silverMorning)
    db.session.add(eno_anEnding)
    db.session.add(aphex_xtal)
    db.session.add(aphex_heliosphan)
    db.session.add(myBloodyValentine_toHere)
    db.session.add(myBloodyValentine_swallow)
    db.session.add(martinRev_mari)
    db.session.add(speedyJ_deOrbit)
    db.session.add(broadcast_tears)
    db.session.add(broadcast_iFound)
    db.session.add(cocteau_lorelei)
    db.session.add(durutti_sketch)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
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

    # Guest songs

    bjork_hands = Song(
        userId=1,
        title="It's In Our Hands",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/Bjo%CC%88rk/Bjo%CC%88rk_It'sInOurHands.mp3",
        album="It's In Our Hands",
        artist='Björk',
        genre='Pop',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/Bjo%CC%88rk/Bjo%CC%88rk_It'sInOurHands_cover.jpeg")

    daveKusworth_orphan = Song(
        userId=1,
        title="Orphan (All His Life)",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/DaveKusworth/DaveKusworth_Orphan(AllHisLife).mp3",
        album="The Bounty Hunters",
        artist='Dave Kusworth',
        genre='Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/DaveKusworth/DaveKusworth_TheBountyHunters_cover.jpg")

    dougSahm_easy = Song(
        userId=1,
        title="It's Gonna Be Easy",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/DougSahm/DougSahm_It'sGonnaBeEasy.mp3",
        album="Doug Sahm and Band",
        artist='Doug Sahm',
        genre='Country',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/DougSahm/DougSahm_cover.jpeg")

    jerryJeffWalker_shell = Song(
        userId=1,
        title="Shell Game",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/JerryJeffWalker/JerryJeffWalker+_ShellGame.mp3",
        album="Driftin' Way of Life",
        artist='Jerry Jeff Walker',
        genre='Country',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/JerryJeffWalker/JerryJeffWalker_cover.jpg")

    johnFrusciante_murderers = Song(
        userId=1,
        title="Murderers",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/John+Fruciante/JohnFrusciante_Murderers.mp3",
        album="To Record Only Water for Ten Days",
        artist='John Frusciante',
        genre='Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/John+Fruciante/JohnFrusciante_ToRecord_cover.jpeg")

    johnFrusciante_ramparts = Song(
        userId=1,
        title="Ramparts",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/John+Fruciante/JohnFrusciante_Ramparts.mp3",
        album="To Record Only Water for Ten Days",
        artist='John Frusciante',
        genre='Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/John+Fruciante/JohnFrusciante_ToRecord_cover.jpeg")

    johnFrusciante_windup = Song(
        userId=1,
        title="Wind Up Space",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/John+Fruciante/JohnFrusciante_WindupSpace.mp3",
        album="To Record Only Water for Ten Days",
        artist='John Frusciante',
        genre='Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/John+Fruciante/JohnFrusciante_ToRecord_cover.jpeg")

    louReed_crazy = Song(
        userId=1,
        title="Crazy Feeling",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/LouReed/LouReed_CrazyFeeling.mp3",
        album="Coney Island Baby",
        artist='Lou Reed',
        genre='Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/LouReed/LouReed_ConeyIslandBaby_cover.jpeg")

    louReed_charley = Song(
        userId=1,
        title="Charley's Girl",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/LouReed/LouReed_Charley'sGirl.mp3",
        album="Coney Island Baby",
        artist='Lou Reed',
        genre='Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/LouReed/LouReed_ConeyIslandBaby_cover.jpeg")

    masayoshi_tengo = Song(
        userId=1,
        title="Oh! Tengo Suerte",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/MasayoshiTakanaka/MasayoshiTakanaka_Oh!TengoSuerte.mp3",
        album="Seychelles",
        artist='Masayoshi Takanaka',
        genre='Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/MasayoshiTakanaka/MasayoshiTakanaka_cover.jpg")

    slumVillage_love = Song(
        userId=1,
        title="Fall In Love",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/SlumVillage/SlumVillage_FallInLove.mp3",
        album="Fantastic, Vol. 2.10",
        artist='Slum Village',
        genre='Hip-Hop',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/SlumVillage/SlumVillage_cover.jpg")

    squarepusher_beep = Song(
        userId=1,
        title="Beep Street",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/Squarepusher/Squarepusher_BeepStreet.mp3",
        album="Hard Normal Daddy",
        artist='Squarepusher',
        genre='Electronic',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/Squarepusher/Squarepusher_cover.jpeg")

    theClean_doYourThing = Song(
        userId=1,
        title="Do Your Thing",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/The+Clean/TheClean_DoYourThing.mp3",
        album="Anthology",
        artist='The Clean',
        genre='Indie Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/The+Clean/TheClean_Anthology_cover.jpeg")

    theClean_slug = Song(
        userId=1,
        title="Slug Song",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/The+Clean/TheClean_SlugSong.mp3",
        album="Anthology",
        artist='The Clean',
        genre='Indie Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/The+Clean/TheClean_Anthology_cover.jpeg")

    theClean_violence = Song(
        userId=1,
        title="Too Much Violence",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/The+Clean/TheClean_TooMuchViolence.mp3",
        album="Anthology",
        artist='The Clean',
        genre='Indie Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/The+Clean/TheClean_Anthology_cover.jpeg")

    theFeelies_eyebrows = Song(
        userId=1,
        title="Raised Eyebrows",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/TheFeelies/TheFeelies_RaisedEyebrows.mp3",
        album="Crazy Rhythms",
        artist='The Feelies',
        genre='Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/TheFeelies/TheFeelies_CrazyRhythms_cover.jpeg")

    theSugarcubes_birthday = Song(
        userId=1,
        title="Birthday",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/TheSugarcubes/TheSugarcubes_Birthday.mp3",
        album="Life's Too Good",
        artist='The Sugarcubes',
        genre='Pop',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/TheSugarcubes/TheSugarcubes_cover.png")

    yoLaTengo_worryingThing = Song(
        userId=1,
        title="A Worrying Thing",
        song_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/YoLaTengo/YoLaTengo_AWorryingThing.mp3",
        album="Painful",
        artist='Yo La Tengo',
        genre='Indie Rock',    
        albumCover_URL="https://jamify.s3.us-west-2.amazonaws.com/Song+seeders/YoLaTengo/YoLaTengo_Painful_cover.png")

    # db.session.add(bjork_hands)
    # db.session.add(daveKusworth_orphan)
    db.session.add(dougSahm_easy)
    db.session.add(jerryJeffWalker_shell)
    # db.session.add(johnFrusciante_murderers)
    # db.session.add(johnFrusciante_ramparts)
    # db.session.add(johnFrusciante_windup)
    # db.session.add(louReed_crazy)
    db.session.add(louReed_charley)
    db.session.add(masayoshi_tengo)
    # db.session.add(slumVillage_love)
    # db.session.add(squarepusher_beep)
    # db.session.add(theClean_doYourThing)
    db.session.add(theClean_slug)
    db.session.add(theClean_violence)
    db.session.add(theFeelies_eyebrows)
    db.session.add(theSugarcubes_birthday)
    db.session.add(yoLaTengo_worryingThing)

    db.session.commit()

    



# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_songs():
    db.session.execute('TRUNCATE songs RESTART IDENTITY CASCADE;')
    db.session.commit()
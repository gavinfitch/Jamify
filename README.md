# Jamify

## Jamify at a glance

Jamify is an application built on PostgreSQL, Flask, React, and Redux which allows users to upload and listen to music, create playlists, like songs, add songs to their "Library", and search a database to discover new music.
<br>
<br>   

Login form -

![Login form](https://jamify.s3.us-west-2.amazonaws.com/Jamify+README+photos/Login.jpg)

Home view -

![Home view](https://jamify.s3.us-west-2.amazonaws.com/Jamify+README+photos/Home.jpg)

Song upload form -

![Song upload form](https://jamify.s3.us-west-2.amazonaws.com/Jamify+README+photos/Upload_form.jpg)

Playlist view -

![Playlist view](https://jamify.s3.us-west-2.amazonaws.com/Jamify+README+photos/Playlist.jpg)

## Application Architecture

Jamify is built with a Python/Flask backend, a JavaScript/React frontend, and a PostgreSQL database. SQLAlchemy and Psycopg2 are used to interface Python with the database. AWS is used for all storage of user uploaded files, and the React-AWS-S3 module is used for communication between React and the S3 bucket. The React-H5-Audio-Player is used for the playback of songs and playlists.
<br>
<br>

## Backend Overview

Jamify utilizes SQLAlchemy to interface Flask with the PostgreSQL database. All user files are uploaded to an S3 bucket, AWS then sends back the location of the files to the backend, where they are stored, along with any other relevant information, in the database.
<br>
<br>

## Backend Technologies 
<br>

### Flask -
Flask was Jamify's choice of server. Its ability to handle complex queries made it perfect for integrating AWS S3, as well as setting up a hyper efficient Redux store.
<br>
<br>

### PostgreSQL -
PostgreSQL was used because it's simple to implement and interact with, yet very powerful.
<br>
<br>

### SQLAlchemy -
SQLAlchemy was the ORM of choice because of its ability to integrate with PostgreSQL.
<br>
<br>

### AWS S3 -
AWS S3 was used for all data storage because it's fast, efficient, relatively easy to use, and well documented. 
<br>
<br>

## Frontend Overview

The majority of Jamify's logic lies in the frontend. With minimal fetch requests to the backend and a simple, yet powerful Redux store the majority of the application's functionality is executed.
<br>
<br>

## Frontend Technologies
<br>

### React -
Jamify is a React app, all display logic is built upon it. It was chosen because of its ease of us, reusable components, and great developer tools.
<br>
<br>

### Redux -
Jamify relies heavily on Redux, utilizing its store for nearly all functionality. 
<br>
<br>

### React-AWS-S3 -
The React-AWS-S3 module was an obvious choice for communication between React and AWS because it allows for immediate upload and retrieval of data to and from an S3 bucket, and it's well documented! 
<br>
<br>

### React-H5-Audio-Player -
The React-H5-Audio-Player was chosen because it's highly customizable, both visually by utilizing its many built in CSS classes, and functionally by passing in callbacks to its many built in props.
<br>
<br>

## Conclusion and next steps
Moving forward I'd like to build out the application with user profiles, artist and album pages, and the ability to follow other users or artists, as well as their playlists.
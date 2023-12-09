FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# Set the base url for the application
ENV REACT_APP_BASE_URL=https://jamifyapp.herokuapp.com/

# Build the React app
RUN npm install
RUN npm run build

FROM python:3.9

# Setup the Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install the Python dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run the Flask environment
CMD gunicorn app:app

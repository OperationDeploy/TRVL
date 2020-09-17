# thesis-travel-app

# TRVL

 Ever have trouble planning a trip with your friends or family? TRVL will solve that problem by automating this process, while adapting to the unique desires, goals and circumstances of each traveller. TRVL is the future of travel planning. More travel, less stress! By simply logging in with your Google account, you gain access to a whole new experience of travel planning. View trip invites from friends, plan a trip based off your group's preferences. Our state of the art algorithm generates the best location choices for your group based off of everyone's input! While planning the trip, find the best prices on flights and hotels all from within the app. Set an itinerary and check weather forecast for each day of the trip. Use the Split Payments feature to share the cost of your travel expenses. And share photos from the trip! TRVL brings all these amazing features together in one app so our travellers can get the most out of their vacations.
 More TRVL, Less Stress.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you how to get a development env running

1. Go the TRVL repository: thesis-travel-app.
2. **_Fork_** the repo.
3. Next, **_git clone_** your fork of the repo.
4. Then, **_cd_** into the repo.
5. Run the command **_npm install_** in the root directory to download dependencies defined in the package.json file.
6. Be sure to add a .env file to your root directory that contains the following environmental variables:
   PORT,
   DB_NAME,
   DB_USER,
   DB_PASS,
   DB_HOST,
   COOKIE_KEY,
   API_KEY,
   TWILIO_ACCOUNT_SID,
   TWILIO_AUTH_TOKEN,
   TWILIO_PHONE_NUMBER,
   HOTEL_API.
7. Also, add a config.js file with the following variables:
   OAUTH_CLIENT_ID,
   CLIENT_SECRET,
   PORT,
   HOST,
   WEATHER_API,
   GEO_API,
   API_KEY,
   API_SECRET,
   GAS_API.
8. Run the command **_npm run start_** to just start the server/index.js.
9. Run the command **_npm run build_** to begin starting frontend.
10. Run the command **_npm run dev_** to start development server.
11. Run the command **_npm run seed_** to seed the database with destinations.

Setting up PostgreSQL Database

1. Install PostgreSQL to your local machine
2. Run postgres -V in your command line to make sure Postgres is installed and running
3. To shell into Postgres run psql postgres
4. To see what users are installed run _ \du _
5. Create a user role CREATE ROLE username WITH LOGIN PASSWORD 'quoted password' [OPTIONS]
6. Once you have your username and password set up, reference the .env file and fill out the DB_NAME,    DB_USER, DB_PASS, and DB_HOST.
7. Create a databases called test_db. CREATE DATABASE test_db
8. Next, run psl [username] -h localhost -d trvl_db -f travel.sql
9. Finally run node seed.js to seed the Destinations table in the database

## Deployment

How to deploy on a live system using AWS
1. Create account on aws
2. Launch an EC2 instance
3. SSH into your instance
4. Install Node.js
5. Install Git and clone repository from GitHub
6. Start the node.js app
7. Keep App running using Pm2

## Built With

- [React](https://reactjs.org/) - Web Framework
- [Webpack](https://maven.apache.org/) - Module Bundle
- [Babel](http://www.dropwizard.io/1.0.2/docs/) - Javascript Compiler
- [Express.js](https://maven.apache.org/) - Server Framework
- [Node.js](https://nodejs.org/en/) - JavaScript Runtime
- [Sequelize](http://www.dropwizard.io/1.0.2/docs/) - ORM
- [AWS](https://aws.amazon.com/dms/) - Database Management System
- [ESLint](http://www.dropwizard.io/1.0.2/docs/) - Linter Tool
- [Prettier](https://prettier.io/docs/en/install.html) - Opinionated Code Formatter
- [Passport](http://www.passportjs.org/docs/authenticate/) - Authentication Protocol
- [AWS](https://aws.amazon.com/) - Deployment Service
- [Twilio](https://www.twilio.com/docs) -Programmable SMS Service
- [Socket.io](https://socket.io/docs/) Real-Time Communication Library
- [Material-UI] (https://material-ui.com/) UI Design Library

## Team: Operation Deploy

[Josh Nunez](https://github.com/joshjnunez)
[Garrett Jones](https://github.com/gjones2019)
[Jessa Daggs](https://github.com/jldaggs88)
[Austin Brown](https://github.com/austinbrown-opspark)

## Acknowledgments

Thank you to the staff and our peers at Operation Spark for inspiring us daily.

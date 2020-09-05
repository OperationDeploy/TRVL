# thesis-travel-app

# TRVL

Elevator pitch
Ever have trouble planning a trip with your friends or family? Well, trvl will solve your problem by automating this process, while adapting to the unique desires, goals, circumstances of each potential traveller. Trvl is the future of travel planning. More travel, less headache!
Major concepts
Logging in and Out with your google account
View trip invites
Planning a trip
	choosing your preferences, dates, trip name
	Inviting a User
Generating the best location choices for your group based off of everyones preferences
Allow travelers to vote on the their top choice out of the generated location choices from our algorithm
View Past, Current, and future trips
Add activities or notes to the tip itinerary
Upload and view trip photos
Add purchases, split payments, and keep track of who owes you money and how much

## Press Release 
# More TRVL with Less Headache with Operation Deploy's new application!
Release Date: August 7, 2020
TRVL makes arranging trip details such as picking a destination and creating an itinerary a breeze. It's the solution to all your group travel and personal travel needs. 
### Features:
Multi-user interface 
User Personalized Experience
Search Engine Optimization

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

A step by step series of examples that tell you how to get a development env running

1. Go the TRVL repository: thesis-travel-app.
2. **_Fork_** the repo.
3. Next, **_git clone_** your fork of the repo.
4. Then, **_cd_** into the repo.
5. Run the command **_npm install_** in the root directory to download dependencies defined in the package.json file.
6. Set up PostgreSQL Database - (see separate instructions below)
7. Be sure to add a .env file to your root directory that contains the following environmental variables: PORT, DB_NAME, DB_USER, DB_PASS, DB_HOST.
8. Run the command **_npm run start_** to just start the server/index.js.
9. Run the command **_npm run build_** to begin starting frontend.
10. Run the command **_npm run dev_** to start development server.

Setting up PostgreSQL Database 
1. Install PostgreSQL to your local machine
2. Run **_postgres -V_** in your command line to make sure Postgres is installed and running
3. To shell into Postgres run **_psql postgres_**
4. To see what users are installed run **_ \du _**
5. Create a user role **_CREATE ROLE username WITH LOGIN PASSWORD 'quoted password' [OPTIONS]_**
6. Once you have your username and password set up, reference the .env file and fill out the DB_NAME, DB_USER, DB_PASS, and DB_HOST.
7. Create a databases called test_db. **_CREATE DATABASE test_db_**
8. Next, run **_psl [username] -h localhost -d trvl_db -f travel.sql_** 
9. Finally run **_node seed.js_** to seed the Destinations table in the database

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [React](https://reactjs.org/) - Web Framework
- [Webpack](https://maven.apache.org/) - Module Bundle
- [Babel](http://www.dropwizard.io/1.0.2/docs/) - Javascript Compiler
- [Express.js](https://maven.apache.org/) - Server Framework
- [Node.js](https://nodejs.org/en/) - JavaScript Runtime
- [Sequelize](http://www.dropwizard.io/1.0.2/docs/) - ORM
- [AWS](https://aws.amazon.com/dms/) - Database Management System
- [ESLint](http://www.dropwizard.io/1.0.2/docs/) - Linter Tool
- [Google-OAUTH](https://rometools.github.io/rome/) - Authentication Protocol
- [AWS](https://aws.amazon.com/) - Deployment Service

## Contributing

Please read \_CONTRIBUTING.md for details on our code of conduct, and the process for submitting pull requests.

## Team: Operation Deploy

[Josh Junez](https://github.com/joshjnunez)
[Garrett Jones](https://github.com/gjones2019)
[Jessa Daggs](https://github.com/jldaggs88)
[Austin Brown](https://github.com/austinbrown-opspark)

## License

This project is licensed under the ISC License.

## Acknowledgments

Thank you to the staff and our peers at Operation Spark for inspiring us daily.

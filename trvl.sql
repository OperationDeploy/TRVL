\connect test_db;
DROP DATABASE trvl_db;
CREATE DATABASE trvl_db;
\connect trvl_db;


CREATE TABLE "Users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" TEXT,
  "last_name" TEXT,
  "email" TEXT,
  "profile_pic" VARCHAR(200),
  "host" boolean,
  "googleId" TEXT UNIQUE,
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "Trips" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "destination" TEXT,
  "start_date" date,
  "end_date" date,
  "googleId" TEXT,
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "TripUsers" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
   "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "TripPreferences" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "temperature" int,
  "city_expenses" int,
  "landscape" int,
  "proximity" int,
  "city_type" int,
  "group_age" int,
  "group_relationship" int,
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "TripPhotos" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "photo_link" TEXT,
   "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "TripProposals" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "destination_A_id" int,
  "destination_B_id" int,
  "destination_C_id" int,
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "TripItineraries" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "event" TEXT,
  "day" date,
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "TripProposalVotes" (
  "id" int,
  "user_id" int,
  "trip_id" int,
  "destination" int,
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "Destinations" (
  "id" SERIAL PRIMARY KEY,
  "city" TEXT,
  "temperature" int,
  "city_expenses" int,
  "landscape" int,
  "proximity" int,
  "city_type" int,
  "group_age" int,
  "group_relationship" int,
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "SplitItems" (
  "id" SERIAL PRIMARY KEY,
  "purchaser_id" int,
  "description" TEXT,
  "price" real,
  "trip_id" int,
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "SplitOwedPayments" (
  "id" SERIAL PRIMARY KEY,
  "ower_id" int,
  "recipient_id" int,
  "amount" real,
  "trip_id" int,
  "item_id" int,
  "createdAt" time,
  "updatedAt" time
);

ALTER TABLE "TripUsers" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "TripUsers" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "Trips" ADD FOREIGN KEY ("googleId") REFERENCES "Users" ("googleId");

ALTER TABLE "TripPreferences" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");;

ALTER TABLE "TripPreferences" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripPhotos" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");;

ALTER TABLE "TripPhotos" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");;

ALTER TABLE "TripProposalVotes" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposalVotes" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");;

ALTER TABLE "TripItineraries" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");;

ALTER TABLE "TripItineraries" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_A_id") REFERENCES "Destinations" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_B_id") REFERENCES "Destinations" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_C_id") REFERENCES "Destinations" ("id");


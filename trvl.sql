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
  "createdAt" time,
  "updatedAt" time
);

CREATE TABLE "Trips" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "destination" TEXT,
  "budget" int,
  "start_date" date,
  "end_date" date
);

CREATE TABLE "TripUsers" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int
);

CREATE TABLE "TripPreferences" (
  "id" int,
  "user_id" int,
  "trip_id" int,
  "temperature" int,
  "city_expenses" int,
  "landscape" int,
  "proximity" int,
  "city_type" int,
  "group_age" int,
  "group_relationship" int
);

CREATE TABLE "TripPhotos" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "photo_link" TEXT
);

CREATE TABLE "TripProposals" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "destination_A_id" int,
  "destination_B_id" int,
  "destination_C_id" int
);

CREATE TABLE "TripItineraries" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "event" TEXT,
  "day" date
);

CREATE TABLE "TripProposalVotes" (
  "id" int,
  "user_id" int,
  "trip_id" int,
  "destination" int
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

ALTER TABLE "TripUsers" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "TripUsers" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripPreferences" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "TripPreferences" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripPhotos" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "TripPhotos" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "TripProposalVotes" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposalVotes" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "TripItineraries" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("id");

ALTER TABLE "TripItineraries" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_A_id") REFERENCES "Destinations" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_B_id") REFERENCES "Destinations" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_C_id") REFERENCES "Destinations" ("id");


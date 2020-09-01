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

CREATE TABLE "trip" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "destination" TEXT,
  "budget" int,
  "start_date" date,
  "end_date" date
);

CREATE TABLE "trip_user" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int
);

CREATE TABLE "trip_preferences" (
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

CREATE TABLE "trip_photo" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "photo_link" TEXT
);

CREATE TABLE "trip_proposal" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "destination_A_id" int,
  "destination_B_id" int,
  "destination_C_id" int
);

CREATE TABLE "trip_itinerary" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "trip_id" int,
  "event" TEXT,
  "day" date
);

CREATE TABLE "trip_proposal_votes" (
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

ALTER TABLE "trip_user" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "trip_user" ADD FOREIGN KEY ("trip_id") REFERENCES "trip" ("id");

ALTER TABLE "trip_preferences" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "trip_preferences" ADD FOREIGN KEY ("trip_id") REFERENCES "trip" ("id");

ALTER TABLE "trip_proposal" ADD FOREIGN KEY ("trip_id") REFERENCES "trip" ("id");

ALTER TABLE "trip_photo" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "trip_photo" ADD FOREIGN KEY ("trip_id") REFERENCES "trip" ("id");

ALTER TABLE "trip_proposal" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "trip_proposal_votes" ADD FOREIGN KEY ("trip_id") REFERENCES "trip" ("id");

ALTER TABLE "trip_proposal_votes" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "trip_itinerary" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

ALTER TABLE "trip_itinerary" ADD FOREIGN KEY ("trip_id") REFERENCES "trip" ("id");

ALTER TABLE "trip_proposal" ADD FOREIGN KEY ("destination_A_id") REFERENCES "destinations" ("id");

ALTER TABLE "trip_proposal" ADD FOREIGN KEY ("destination_B_id") REFERENCES "destinations" ("id");

ALTER TABLE "trip_proposal" ADD FOREIGN KEY ("destination_C_id") REFERENCES "destinations" ("id");


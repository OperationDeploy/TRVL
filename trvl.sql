\connect test_db;
DROP DATABASE trvl_db;
CREATE DATABASE trvl_db;
\connect trvl_db;

CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE "Users" (
  "id" int,
  "first_name" TEXT,
  "last_name" TEXT,
  "email" TEXT,
  "profile_pic" VARCHAR(200),
  "host" boolean,
  "googleId" TEXT PRIMARY KEY,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "Trips" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT,
  "destination" TEXT,
  "start_date" date,
  "end_date" date,
  "googleId" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "TripUsers" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT,
  "trip_id" int,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "TripPreferences" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT,
  "trip_id" int,
  "temperature" int,
  "city_expenses" int,
  "landscape" int,
  "proximity" int,
  "city_type" int,
  "group_age" int,
  "group_relationship" int,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "TripPhotos" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT,
  "trip_id" int,
  "photo_link" TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "TripProposals" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT,
  "trip_id" int,
  "destination_A_id" int,
  "destination_B_id" int,
  "destination_C_id" int,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "TripItineraries" (
  "id" SERIAL PRIMARY KEY,
  "user_id" TEXT,
  "trip_id" int,
  "event" TEXT,
  "day" date,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "TripProposalVotes" (
  "id" int,
  "user_id" TEXT,
  "trip_id" int,
  "destination" int,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
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
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "SplitItems" (
  "id" SERIAL PRIMARY KEY,
  "purchaser_id" TEXT,
  "description" TEXT,
  "price" real,
  "trip_id" int,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

CREATE TABLE "SplitOwedPayments" (
  "id" SERIAL PRIMARY KEY,
  "ower_id" TEXT,
  "recipient_id" TEXT,
  "amount" real,
  "trip_id" int,
  "item_id" int,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

ALTER TABLE "TripUsers" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("googleId");

ALTER TABLE "TripUsers" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "Trips" ADD FOREIGN KEY ("googleId") REFERENCES "Users" ("googleId");

ALTER TABLE "TripPreferences" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("googleId");;

ALTER TABLE "TripPreferences" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripPhotos" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("googleId");;

ALTER TABLE "TripPhotos" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("googleId");;

ALTER TABLE "TripProposalVotes" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposalVotes" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("googleId");;

ALTER TABLE "TripItineraries" ADD FOREIGN KEY ("user_id") REFERENCES "Users" ("googleId");;

ALTER TABLE "TripItineraries" ADD FOREIGN KEY ("trip_id") REFERENCES "Trips" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_A_id") REFERENCES "Destinations" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_B_id") REFERENCES "Destinations" ("id");

ALTER TABLE "TripProposals" ADD FOREIGN KEY ("destination_C_id") REFERENCES "Destinations" ("id");


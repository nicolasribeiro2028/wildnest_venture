-- Disable FK enforcement during table recreation
PRAGMA foreign_keys = OFF;

-- Recreate User table with first_name, last_name, phone (dropping old name column)
CREATE TABLE "User_new" (
    "id"            TEXT     NOT NULL PRIMARY KEY,
    "email"         TEXT     NOT NULL,
    "first_name"    TEXT     NOT NULL DEFAULT '',
    "last_name"     TEXT     NOT NULL DEFAULT '',
    "phone"         TEXT,
    "password_hash" TEXT     NOT NULL,
    "created_at"    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Migrate existing rows: put old name value into first_name, leave last_name blank
INSERT INTO "User_new" ("id", "email", "first_name", "last_name", "phone", "password_hash", "created_at")
SELECT
    "id",
    "email",
    COALESCE("name", ''),
    '',
    NULL,
    "password_hash",
    "created_at"
FROM "User";

DROP TABLE "User";
ALTER TABLE "User_new" RENAME TO "User";

-- Recreate unique index
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Re-enable FK enforcement
PRAGMA foreign_keys = ON;

-- CreateTable UserPreference
CREATE TABLE "UserPreference" (
    "id"                   TEXT     NOT NULL PRIMARY KEY,
    "user_id"              TEXT     NOT NULL,
    "total_occupants"      INTEGER,
    "max_rent"             INTEGER,
    "location_tags"        TEXT,
    "quiet_place"          BOOLEAN,
    "has_dog"              BOOLEAN,
    "close_to_supermarket" BOOLEAN,
    "close_to_bus_stop"    BOOLEAN,
    "updated_at"           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserPreference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_user_id_key" ON "UserPreference"("user_id");

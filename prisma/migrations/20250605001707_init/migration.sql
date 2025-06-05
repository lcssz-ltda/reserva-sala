-- CreateTable
CREATE TABLE "Users" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rooms" (
    "room_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Reservations" (
    "reservation_id" TEXT NOT NULL PRIMARY KEY,
    "room_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "initial_date" DATETIME NOT NULL,
    "final_date" DATETIME NOT NULL,
    CONSTRAINT "Reservations_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms" ("room_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Reservations_room_id_initial_date_final_date_idx" ON "Reservations"("room_id", "initial_date", "final_date");

-- CreateIndex
CREATE INDEX "Reservations_user_id_idx" ON "Reservations"("user_id");

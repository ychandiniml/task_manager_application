/*
  Warnings:

  - You are about to drop the column `first_name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `users` table. All the data in the column will be lost.
  - Added the required column `firstname` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "vendor_uid" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT,
    "email" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("created_at", "email", "updated_at", "user_id", "vendor_uid") SELECT "created_at", "email", "updated_at", "user_id", "vendor_uid" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

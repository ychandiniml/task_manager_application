/*
  Warnings:

  - A unique constraint covering the columns `[vendor_uid]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_vendor_uid_key" ON "users"("vendor_uid");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

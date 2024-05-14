/*
  Warnings:

  - Added the required column `pointExpirationDate` to the `UserPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userpoint` ADD COLUMN `pointExpirationDate` DATETIME(3) NOT NULL;

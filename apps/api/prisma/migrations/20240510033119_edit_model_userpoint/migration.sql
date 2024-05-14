/*
  Warnings:

  - You are about to drop the column `pointExpirationDate` on the `userpoint` table. All the data in the column will be lost.
  - Added the required column `pointExpiredDate` to the `UserPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `userpoint` DROP COLUMN `pointExpirationDate`,
    ADD COLUMN `pointExpiredDate` DATETIME(3) NOT NULL;

/*
  Warnings:

  - You are about to drop the `referral` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referral]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `referral` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `referral`;

-- CreateIndex
CREATE UNIQUE INDEX `User_referral_key` ON `User`(`referral`);

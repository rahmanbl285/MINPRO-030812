/*
  Warnings:

  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `createAt` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `finalPoint` on the `userpoint` table. All the data in the column will be lost.
  - You are about to drop the column `pointRedeem` on the `userpoint` table. All the data in the column will be lost.
  - You are about to drop the column `pointReward` on the `userpoint` table. All the data in the column will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referral` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `referralorder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ticket` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[eventTitle]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventSlug]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[eventOrganizerName]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[referralCode]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserPoint` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPerson` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactPersonNumber` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventImage` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventOrganizerImg` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventOrganizerName` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventSlug` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventTitle` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userToken` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `UserPoint` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `referral` DROP FOREIGN KEY `Referral_userId_fkey`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `date`,
    DROP COLUMN `title`,
    ADD COLUMN `availableSeat` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `category` ENUM('Festival', 'Konser', 'Pertandingan', 'Pameran', 'Workshop', 'Pertunjukan', 'Seminar') NOT NULL,
    ADD COLUMN `contactPerson` VARCHAR(191) NOT NULL,
    ADD COLUMN `contactPersonNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `eventDate` DATETIME(3) NOT NULL,
    ADD COLUMN `eventImage` LONGTEXT NOT NULL,
    ADD COLUMN `eventOrganizerImg` LONGTEXT NOT NULL,
    ADD COLUMN `eventOrganizerName` VARCHAR(191) NOT NULL,
    ADD COLUMN `eventSlug` VARCHAR(191) NOT NULL,
    ADD COLUMN `eventTitle` VARCHAR(191) NOT NULL,
    ADD COLUMN `isPaid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `createAt`,
    DROP COLUMN `name`,
    DROP COLUMN `roleId`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstname` VARCHAR(191) NOT NULL,
    ADD COLUMN `isEventOrganizer` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `lastname` VARCHAR(191) NOT NULL,
    ADD COLUMN `referralCode` VARCHAR(191) NULL,
    ADD COLUMN `userToken` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `userpoint` DROP COLUMN `finalPoint`,
    DROP COLUMN `pointRedeem`,
    DROP COLUMN `pointReward`,
    ADD COLUMN `amount` INTEGER NOT NULL;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `referral`;

-- DropTable
DROP TABLE `referralorder`;

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `ticket`;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `orderEventId` INTEGER NOT NULL,
    `discountId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `amount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Transaction_orderEventId_key`(`orderEventId`),
    UNIQUE INDEX `Transaction_discountId_key`(`discountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiscountVoucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `userDiscountId` INTEGER NOT NULL,
    `discountCoupon` VARCHAR(191) NOT NULL,
    `discountPercentage` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiredDate` DATETIME(3) NOT NULL,
    `discountStatus` ENUM('Active', 'Expired') NOT NULL,

    UNIQUE INDEX `DiscountVoucher_userDiscountId_key`(`userDiscountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `discount` INTEGER NULL,

    UNIQUE INDEX `Cart_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CartItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cartId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Event_eventTitle_key` ON `Event`(`eventTitle`);

-- CreateIndex
CREATE UNIQUE INDEX `Event_eventSlug_key` ON `Event`(`eventSlug`);

-- CreateIndex
CREATE UNIQUE INDEX `Event_eventOrganizerName_key` ON `Event`(`eventOrganizerName`);

-- CreateIndex
CREATE UNIQUE INDEX `User_referralCode_key` ON `User`(`referralCode`);

-- CreateIndex
CREATE UNIQUE INDEX `UserPoint_userId_key` ON `UserPoint`(`userId`);

-- AddForeignKey
ALTER TABLE `UserPoint` ADD CONSTRAINT `UserPoint_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `DiscountVoucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiscountVoucher` ADD CONSTRAINT `DiscountVoucher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `Cart`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CartItem` ADD CONSTRAINT `CartItem_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

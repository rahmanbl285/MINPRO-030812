/*
  Warnings:

  - You are about to drop the column `discount` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `availableSeat` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `contactPerson` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `contactPersonNumber` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `eventOrganizerName` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `discountId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `orderEventId` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `payment` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `payment` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `createdAt` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `userReferralCode` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `currentPoint` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `isOrganizer` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `referralCode` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `discountvoucher` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userpoint` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[referralCode]` on the table `Referral` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpName` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpNumber` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventCategory` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventLocation` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referralCode` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `discountvoucher` DROP FOREIGN KEY `DiscountVoucher_userId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_discountId_fkey`;

-- DropForeignKey
ALTER TABLE `payment` DROP FOREIGN KEY `Payment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userpoint` DROP FOREIGN KEY `UserPoint_userId_fkey`;

-- DropIndex
DROP INDEX `Event_eventOrganizerName_key` ON `event`;

-- DropIndex
DROP INDEX `Payment_orderEventId_key` ON `payment`;

-- DropIndex
DROP INDEX `User_referralCode_key` ON `user`;

-- AlterTable
ALTER TABLE `cart` DROP COLUMN `discount`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `availableSeat`,
    DROP COLUMN `category`,
    DROP COLUMN `contactPerson`,
    DROP COLUMN `contactPersonNumber`,
    DROP COLUMN `eventDate`,
    DROP COLUMN `eventOrganizerName`,
    DROP COLUMN `isPaid`,
    DROP COLUMN `location`,
    DROP COLUMN `price`,
    ADD COLUMN `cpName` VARCHAR(191) NOT NULL,
    ADD COLUMN `cpNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `endDate` DATETIME(3) NOT NULL,
    ADD COLUMN `eventCategory` ENUM('Festival', 'Konser', 'Pertandingan', 'Pameran', 'Workshop', 'Pertunjukan', 'Seminar') NOT NULL,
    ADD COLUMN `eventLocation` VARCHAR(191) NOT NULL,
    ADD COLUMN `startDate` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `total`,
    ADD COLUMN `amount` DOUBLE NOT NULL,
    ADD COLUMN `discountId` INTEGER NULL,
    ADD COLUMN `pointsId` INTEGER NULL;

-- AlterTable
ALTER TABLE `payment` DROP COLUMN `discountId`,
    DROP COLUMN `orderEventId`,
    DROP COLUMN `price`,
    DROP COLUMN `userId`,
    ADD COLUMN `paymentStatus` ENUM('Pending', 'Completed', 'Failed') NOT NULL,
    MODIFY `amount` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `referral` DROP COLUMN `createdAt`,
    DROP COLUMN `userReferralCode`,
    ADD COLUMN `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `referralCode` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `currentPoint`,
    DROP COLUMN `firstname`,
    DROP COLUMN `isOrganizer`,
    DROP COLUMN `lastname`,
    DROP COLUMN `referralCode`,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `usedReferralCode` VARCHAR(191) NULL,
    MODIFY `userToken` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `discountvoucher`;

-- DropTable
DROP TABLE `userpoint`;

-- CreateTable
CREATE TABLE `Points` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `currentPoint` INTEGER NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiredDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `pointStatus` ENUM('Active', 'Expired') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Discount` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `currentDiscount` INTEGER NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiredDate` DATETIME(3) NOT NULL,
    `discountStatus` ENUM('Active', 'Expired') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tiket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `ticketName` VARCHAR(191) NOT NULL,
    `isPaid` BOOLEAN NOT NULL DEFAULT false,
    `availableSeat` INTEGER NOT NULL,
    `ticketPrice` INTEGER NOT NULL,
    `startSaleDate` DATETIME(3) NOT NULL,
    `endSaleDate` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PromoTiket` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tiketId` INTEGER NOT NULL,
    `promoName` VARCHAR(191) NOT NULL,
    `promoDiscount` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiredAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PromoTiket_tiketId_key`(`tiketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `rating` DOUBLE NOT NULL,
    `comment` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Referral_referralCode_key` ON `Referral`(`referralCode`);

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Discount` ADD CONSTRAINT `Discount_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tiket` ADD CONSTRAINT `Tiket_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromoTiket` ADD CONSTRAINT `PromoTiket_tiketId_fkey` FOREIGN KEY (`tiketId`) REFERENCES `Tiket`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_discountId_fkey` FOREIGN KEY (`discountId`) REFERENCES `Discount`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_pointsId_fkey` FOREIGN KEY (`pointsId`) REFERENCES `Points`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

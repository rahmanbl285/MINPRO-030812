/*
  Warnings:

  - You are about to drop the `eventorganizer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `eventorganizer` DROP FOREIGN KEY `EventOrganizer_eventId_fkey`;

-- DropTable
DROP TABLE `eventorganizer`;

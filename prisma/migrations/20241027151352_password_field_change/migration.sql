/*
  Warnings:

  - You are about to drop the column `password` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Client` DROP COLUMN `password`;

-- CreateTable
CREATE TABLE `Authentication` (
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NULL,
    `clientId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Authentication_clientId_key`(`clientId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

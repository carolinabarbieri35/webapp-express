/*
  Warnings:

  - You are about to drop the column `Ingredient` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `ProductVariant` on the `category` table. All the data in the column will be lost.
  - You are about to drop the column `SkinType` on the `category` table. All the data in the column will be lost.
  - Added the required column `ingredient` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productVariant` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `skinType` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `Ingredient`,
    DROP COLUMN `ProductVariant`,
    DROP COLUMN `SkinType`,
    ADD COLUMN `ingredient` TEXT NOT NULL,
    ADD COLUMN `productVariant` VARCHAR(191) NOT NULL,
    ADD COLUMN `skinType` VARCHAR(15) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `gender` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_gender_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "gender";

-- DropEnum
DROP TYPE "Gender";

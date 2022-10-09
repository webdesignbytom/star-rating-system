/*
  Warnings:

  - Added the required column `cost` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "cost" INTEGER NOT NULL,
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

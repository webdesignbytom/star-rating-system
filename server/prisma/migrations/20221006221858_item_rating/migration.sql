/*
  Warnings:

  - A unique constraint covering the columns `[itemId]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Rating_itemId_key" ON "Rating"("itemId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

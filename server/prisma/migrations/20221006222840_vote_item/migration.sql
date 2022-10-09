/*
  Warnings:

  - You are about to drop the column `votes` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ratingId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ratingId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "votes";

-- AlterTable
ALTER TABLE "Vote" ADD COLUMN     "ratingId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_ratingId_key" ON "Vote"("ratingId");

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Rating"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

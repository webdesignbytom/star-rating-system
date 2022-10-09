-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "score" INTEGER NOT NULL,
    "votes" INTEGER[],

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

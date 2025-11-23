/*
  Warnings:

  - You are about to drop the `Rating` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `college_id` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "college_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Rating";

-- CreateTable
CREATE TABLE "CollegeRating" (
    "id" SERIAL NOT NULL,
    "college_id" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CollegeRating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollegeRating_college_id_key" ON "CollegeRating"("college_id");

-- AddForeignKey
ALTER TABLE "CollegeRating" ADD CONSTRAINT "CollegeRating_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

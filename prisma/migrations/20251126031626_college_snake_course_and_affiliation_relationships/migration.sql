/*
  Warnings:

  - You are about to drop the column `affiliationId` on the `CollegeAffiliation` table. All the data in the column will be lost.
  - You are about to drop the column `collegeId` on the `CollegeAffiliation` table. All the data in the column will be lost.
  - You are about to drop the column `collegeId` on the `CollegeCourse` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `CollegeCourse` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[college_id,affiliation_id]` on the table `CollegeAffiliation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[college_id,course_id]` on the table `CollegeCourse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `affiliation_id` to the `CollegeAffiliation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `college_id` to the `CollegeAffiliation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `college_id` to the `CollegeCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `course_id` to the `CollegeCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CollegeAffiliation" DROP CONSTRAINT "CollegeAffiliation_affiliationId_fkey";

-- DropForeignKey
ALTER TABLE "CollegeAffiliation" DROP CONSTRAINT "CollegeAffiliation_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "CollegeCourse" DROP CONSTRAINT "CollegeCourse_collegeId_fkey";

-- DropForeignKey
ALTER TABLE "CollegeCourse" DROP CONSTRAINT "CollegeCourse_courseId_fkey";

-- DropIndex
DROP INDEX "CollegeAffiliation_collegeId_affiliationId_key";

-- DropIndex
DROP INDEX "CollegeCourse_collegeId_courseId_key";

-- AlterTable
ALTER TABLE "CollegeAffiliation" DROP COLUMN "affiliationId",
DROP COLUMN "collegeId",
ADD COLUMN     "affiliation_id" INTEGER NOT NULL,
ADD COLUMN     "college_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CollegeCourse" DROP COLUMN "collegeId",
DROP COLUMN "courseId",
ADD COLUMN     "college_id" INTEGER NOT NULL,
ADD COLUMN     "course_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CollegeAffiliation_college_id_affiliation_id_key" ON "CollegeAffiliation"("college_id", "affiliation_id");

-- CreateIndex
CREATE UNIQUE INDEX "CollegeCourse_college_id_course_id_key" ON "CollegeCourse"("college_id", "course_id");

-- AddForeignKey
ALTER TABLE "CollegeAffiliation" ADD CONSTRAINT "CollegeAffiliation_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeAffiliation" ADD CONSTRAINT "CollegeAffiliation_affiliation_id_fkey" FOREIGN KEY ("affiliation_id") REFERENCES "Affiliation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeCourse" ADD CONSTRAINT "CollegeCourse_college_id_fkey" FOREIGN KEY ("college_id") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeCourse" ADD CONSTRAINT "CollegeCourse_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "CollegeAffiliation" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "affiliationId" INTEGER NOT NULL,

    CONSTRAINT "CollegeAffiliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeCourse" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CollegeCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CollegeAffiliation_collegeId_affiliationId_key" ON "CollegeAffiliation"("collegeId", "affiliationId");

-- CreateIndex
CREATE UNIQUE INDEX "CollegeCourse_collegeId_courseId_key" ON "CollegeCourse"("collegeId", "courseId");

-- AddForeignKey
ALTER TABLE "CollegeAffiliation" ADD CONSTRAINT "CollegeAffiliation_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeAffiliation" ADD CONSTRAINT "CollegeAffiliation_affiliationId_fkey" FOREIGN KEY ("affiliationId") REFERENCES "Affiliation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeCourse" ADD CONSTRAINT "CollegeCourse_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeCourse" ADD CONSTRAINT "CollegeCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

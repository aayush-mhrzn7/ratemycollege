import { Affiliation, Course } from "@/generated/prisma/client";
import { env } from "@/lib/env";
import { DALResponse } from "@/lib/interface";
import prisma from "@/lib/prisma";
export type CourseWithAffiliation = Pick<Course, "id" | "name" | "year"> & {
  affiliation: Pick<Affiliation, "id" | "name">;
};
const getCourses = async ({
  page = 1,
}: {
  page?: number;
}): Promise<DALResponse<CourseWithAffiliation>> => {
  try {
    console.log(page, "page");
    const limit = Number(env.LIMIT);
    const count = await prisma.course.count();
    const noOfPages = Math.ceil(count / limit);
    const currentPage = Math.min(page, noOfPages);
    const skip = (currentPage - 1) * limit;

    const courses = await prisma.course.findMany({
      include: {
        affiliation: true,
      },
      omit: {
        created_at: true,
        updated_at: true,
        affiliationId: true,
      },
      skip: skip,
      take: limit,
    });
    return {
      hasNext: currentPage < noOfPages,
      hasPrev: currentPage > 1,
      count: count,
      data: courses,
    };
  } catch (error) {
    console.log(error);
    return {
      hasNext: false,
      hasPrev: false,
      count: 0,
      data: [],
    };
  }
};

export { getCourses };

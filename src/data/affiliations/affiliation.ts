import { Affiliation } from "@/generated/prisma/client";
import { env } from "@/lib/env";
import { DALResponse } from "@/lib/interface";
import prisma from "@/lib/prisma";

const getAffiliations = async ({
  page = 1,
}: {
  page?: number;
}): Promise<DALResponse<Pick<Affiliation, "id" | "name">>> => {
  try {
    const limit = Number(env.LIMIT);
    const count = await prisma.affiliation.count();
    const noOfPages = Math.ceil(count / limit);
    const currentPage = Math.min(page, noOfPages);
    const skip = (currentPage - 1) * limit;

    const affiliations = await prisma.affiliation.findMany({
      select: {
        id: true,
        name: true,
      },
      skip: skip,
      take: limit,
    });
    return {
      hasNext: currentPage < noOfPages,
      hasPrev: currentPage > 1,
      count: count,
      data: affiliations,
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

export { getAffiliations };

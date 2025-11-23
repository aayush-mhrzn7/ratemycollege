"use server";

import { ActionResponse } from "@/lib/interface";
import prisma from "@/lib/prisma";
import { affiliationSchema, affiliationType } from "@/lib/zod-schema";

const createAffiliation = async (
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const data = {
      name: formData.get("name"),
    };
    const validation = affiliationSchema.safeParse(data);
    if (validation.error) {
      return {
        message: "All Fields are to be filled",
        status: 401,
        type: "error",
      };
    }
    const alreadyExists = await prisma.affiliation.findUnique({
      where: {
        name: validation.data.name,
      },
    });
    if (alreadyExists) {
      return {
        message: "Affiliation with this name already exists",
        status: 400,
        type: "error",
      };
    }
    const newAffiliation = await prisma.affiliation.create({
      data: validation.data,
    });
    console.log(newAffiliation);
    return {
      message: "Successfully created a new affiliation",
      status: 201,
      type: "success",
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
      type: "error",
    };
  }
};
const updateAffiliations = async (
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const id = formData.get("id");
    if (!Number(id) || isNaN(Number(id))) {
      return {
        message: "Invalid ID provided",
        status: 400,
        type: "error",
      };
    }
    const data = {
      name: formData.get("name"),
    };
    const exists = await prisma.affiliation.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!exists) {
      return {
        message: "The Id doesnt exists cant Update",
        status: 400,
        type: "error",
      };
    }
    const validation = affiliationSchema.safeParse(data);
    if (validation.error) {
      return {
        message: "The Fields must be all filled",
        status: 400,
        type: "error",
      };
    }
    const { name } = validation.data;
    const nameExists = await prisma.affiliation.findFirst({
      where: {
        name,
        id: {
          not: Number(id),
        },
      },
    });

    if (nameExists) {
      return {
        message: "An affiliation with this name already exists",
        status: 400,
        type: "error",
      };
    }
    const updatedAffilations = await prisma.affiliation.update({
      data: {
        name,
      },
      where: {
        id: Number(id),
      },
    });

    return {
      message: "Successfully updaed affilation no " + id,
      status: 200,
      type: "success",
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
      type: "error",
    };
  }
};
const deleteAffiliation = async ({
  id,
}: {
  id: number;
}): Promise<ActionResponse> => {
  try {
    const exists = await prisma.affiliation.findUnique({
      where: {
        id,
      },
    });
    if (!exists) {
      return {
        message: "The Id doesnt exists cant delete",
        status: 400,
        type: "error",
      };
    }
    await prisma.affiliation.delete({
      where: {
        id,
      },
    });

    return {
      message: "Successfully deleted affilation no " + id,
      status: 202,
      type: "success",
    };
  } catch (error) {
    return {
      message: "Internal Server Error",
      status: 500,
      type: "error",
    };
  }
};
const bulkDeleteAffiliation = async ({
  ids,
}: {
  ids: number[];
}): Promise<ActionResponse> => {
  try {
    const existing = await prisma.affiliation.findMany({
      where: { id: { in: ids } },
      select: { id: true },
    });

    if (existing.length === 0) {
      return {
        message: "The provided IDs do not exist; nothing to delete.",
        status: 400,
        type: "error",
      };
    }

    const existingIds = new Set(existing.map((x) => x.id));
    const nonExistingIds = ids.filter((id) => !existingIds.has(id));

    // Delete only the matched IDs
    const deleted = await prisma.affiliation.deleteMany({
      where: {
        id: {
          in: [...existingIds],
        },
      },
    });

    const baseMsg = `Successfully deleted ${deleted.count} affiliations`;

    return {
      message:
        nonExistingIds.length > 0
          ? `${baseMsg}, but the following IDs do not exist: ${nonExistingIds.join(
              ", "
            )}`
          : baseMsg,
      status: 202,
      type: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Internal Server Error",
      status: 500,
      type: "error",
    };
  }
};

export {
  createAffiliation,
  updateAffiliations,
  deleteAffiliation,
  bulkDeleteAffiliation,
};

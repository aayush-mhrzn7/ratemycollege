"use server";

import { ActionResponse } from "@/lib/interface";
import prisma from "@/lib/prisma";
import { affiliationType, courseSchema } from "@/lib/zod-schema";

const createCourse = async (formData: FormData): Promise<ActionResponse> => {
  try {
    console.log(formData);
    const data = {
      name: formData.get("name"),
      year: formData.get("year"),
      affiliationId: Number(formData.get("affiliationId")),
    };

    const validation = courseSchema.safeParse(data);
    console.log(validation, "validation");
    if (validation.error) {
      return {
        message: "All Fields are to be filled",
        status: 401,
        type: "error",
      };
    }

    const alreadyExists = await prisma.course.findFirst({
      where: {
        name: validation.data.name,
      },
    });
    if (alreadyExists) {
      return {
        message: "Course with this name already exists",
        status: 400,
        type: "error",
      };
    }
    const newCourse = await prisma.course.create({
      data: validation.data,
    });
    console.log(newCourse);
    return {
      message: "Successfully created a new course",
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
const updateCourse = async (formData: FormData): Promise<ActionResponse> => {
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
    const exists = await prisma.course.findUnique({
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
    const validation = courseSchema.safeParse(data);
    if (validation.error) {
      return {
        message: "The Fields must be all filled",
        status: 400,
        type: "error",
      };
    }

    await prisma.course.update({
      data: validation.data,
      where: {
        id: Number(id),
      },
    });

    return {
      message: "Successfully updaed course no " + id,
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
const deleteCourse = async ({
  id,
}: {
  id: number;
}): Promise<ActionResponse> => {
  try {
    const exists = await prisma.course.findUnique({
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
    await prisma.course.delete({
      where: {
        id,
      },
    });

    return {
      message: "Successfully deleted course no " + id,
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
const bulkDeleteCourse = async ({
  ids,
}: {
  ids: number[];
}): Promise<ActionResponse> => {
  try {
    const existing = await prisma.course.findMany({
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
    const deleted = await prisma.course.deleteMany({
      where: {
        id: {
          in: [...existingIds],
        },
      },
    });

    const baseMsg = `Successfully deleted ${deleted.count} courses`;

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

export { createCourse };

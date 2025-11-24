"use server";

import { ActionResponse } from "@/lib/interface";
import prisma from "@/lib/prisma";
import { reviewSchema } from "@/lib/zod-schema";

const createReview = async (formData: FormData): Promise<ActionResponse> => {
  try {
    const data = {
      academic_score: formData.get("academic_score") as string,
      faculty_score: formData.get("faculty_score") as string,
      infrastructure_score: formData.get("infrastructure_score") as string,
      social_score: formData.get("social_score") as string,
      career_score: formData.get("career_score") as string,
      experience: formData.get("experience")?.toString() || "",
      college_id: formData.get("college_id") as string,
      //   photos: JSON.parse(formData.get("photos") as string || "[]"),
    };
    console.log(data, "Data");
    // Validate
    const validation = reviewSchema.safeParse(data);

    if (!validation.success) {
      return {
        message: "Invalid form data",
        status: 400,
        type: "error",
      };
    }

    // Check if college exists
    const collegeExists = await prisma.college.findUnique({
      where: { id: validation.data.college_id },
    });
    console.log(collegeExists, "exist");
    if (!collegeExists) {
      return {
        message: "This college does not exist",
        status: 404,
        type: "error",
      };
    }

    // Create review
    const newReview = await prisma.review.create({
      data: validation.data,
    });
    console.log(newReview, "new Review");
    return {
      message: "Review submitted successfully",
      status: 201,
      type: "success",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong while submitting review",
      status: 500,
      type: "error",
    };
  }
};

export default createReview;

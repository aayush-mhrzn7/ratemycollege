import ReviewModel from "@/app/college/_components/ReviewModel";
import React from "react";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  return (
    <div className="max-w-5xl p mx-auto py-40">
      <h3 className="px-4 text-2xl text-pretty capitalize font-semibold">
        Write a Review for {slug.split("-").join(" ")}
      </h3>
      <p className="px-4 text-muted-foreground">
        Your review today will help the students of tommorrow to choose their
        future college
      </p>
      <div className="mt-5">
        <ReviewModel />
      </div>
    </div>
  );
};

export default page;

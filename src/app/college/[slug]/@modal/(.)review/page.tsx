import ReviewModel from "@/app/college/_components/ReviewModel";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  let open = true;
  let slug = (await params).slug;
  return (
    <Dialog defaultOpen={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">
            Write a Review for {slug.split("-")[0]}
          </DialogTitle>
          <DialogDescription>
            Your review today will help the students of tommorrow to choose
            their future college
          </DialogDescription>
        </DialogHeader>
        <>{<ReviewModel />}</>
      </DialogContent>
    </Dialog>
  );
};

export default page;

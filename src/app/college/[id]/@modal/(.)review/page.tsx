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

const page = () => {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a Review for Swastik College</DialogTitle>
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

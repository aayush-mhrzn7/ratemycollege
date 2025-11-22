import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Flag, GraduationCap, Laptop, School, Star, Users } from "lucide-react";
import { Separator } from "../ui/separator";
import Avatar from "./Avatar";

const StudentReviewDetail = ({ trigger }: { trigger: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="capitalize">
            <CardHeader className="flex px-0 items-center justify-start">
              <Avatar />
              <CardContent>
                {" "}
                <CardTitle>Aayush Maharjan</CardTitle>
                <CardDescription className="mt-2">
                  Bsc CSIT student at Kathford (class 2022)
                </CardDescription>
              </CardContent>
            </CardHeader>
          </DialogTitle>
          <DialogDescription>
            <span className="font-bold">Overall Rating</span>
            <div className="flex gap-2 mt-2 items-center">
              {Array.from({ length: 5 }).map((item, index) => (
                <Star className="size-4" key={index} />
              ))}
            </div>
            <p className="mt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
              aspernatur, temporibus dolorum quos, reprehenderit perspiciatis
              excepturi est consequatur assumenda quisquam sapiente delectus
              animi aperiam quod impedit nesciunt beatae necessitatibus fuga.
              Illum dolorem doloribus ut laborum excepturi expedita? Laboriosam
              provident quam excepturi atque placeat, neque vero cumque dolorem
              quidem, accusamus assumenda corrupti quibusdam enim tempora
              expedita facilis quod! Cum, deleniti maiores!
            </p>
            <Separator className="my-10" />
            <div className="px-4 py-2">
              <div className="flex my-2 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="p-2 w-fit flex justify-center items-center rounded-full bg-secondary">
                    <GraduationCap className="size-4" />
                  </span>
                  Academics
                </div>
                <div className="flex gap-2 items-center">
                  {Array.from({ length: 5 }).map((item, index) => (
                    <Star className="size-4" key={index} />
                  ))}
                </div>
              </div>
              <div className="flex my-2 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="p-2 w-fit flex justify-center items-center rounded-full bg-secondary">
                    <Users className="size-4" />
                  </span>
                  Faculty
                </div>
                <div className="flex gap-2 items-center">
                  {Array.from({ length: 5 }).map((item, index) => (
                    <Star className="size-4" key={index} />
                  ))}
                </div>
              </div>
              <div className="flex my-2 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="p-2 w-fit flex justify-center items-center rounded-full bg-secondary">
                    <School className="size-4" />
                  </span>
                  Infrastructure
                </div>
                <div className="flex gap-2 items-center">
                  {Array.from({ length: 5 }).map((item, index) => (
                    <Star className="size-4" key={index} />
                  ))}
                </div>
              </div>
              <div className="flex my-2 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="p-2 w-fit flex justify-center items-center rounded-full bg-secondary">
                    <Users className="size-4" />
                  </span>
                  Social Life
                </div>
                <div className="flex gap-2 items-center">
                  {Array.from({ length: 5 }).map((item, index) => (
                    <Star className="size-4" key={index} />
                  ))}
                </div>
              </div>
              <div className="flex my-2 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="p-2 w-fit flex justify-center items-center rounded-full bg-secondary">
                    <Laptop className="size-4" />
                  </span>
                  Career Opportunities
                </div>
                <div className="flex gap-2 items-center">
                  {Array.from({ length: 5 }).map((item, index) => (
                    <Star className="size-4" key={index} />
                  ))}
                </div>
              </div>
              <div className="flex my-2 justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="p-2 w-fit flex justify-center items-center rounded-full bg-secondary">
                    <Flag className="size-4" />
                  </span>
                  Co Curricular
                </div>
                <div className="flex gap-2 items-center">
                  {Array.from({ length: 5 }).map((item, index) => (
                    <Star className="size-4" key={index} />
                  ))}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StudentReviewDetail;

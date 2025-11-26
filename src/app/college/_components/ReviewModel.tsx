import CustomDropzone from "@/components/internal/Fileupload";
import { Button } from "@/components/ui/button";
import { Flag, GraduationCap, Laptop, School, Star, Users } from "lucide-react";
import React from "react";

const ReviewModel = () => {
  return (
    <div className="">
      <h6 className="px-4 py-2">Rate You're Experience</h6>
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
      <div className="px-4 py-2">
        <h6>Share your Story</h6>
        <textarea
          name=""
          rows={12}
          id=""
          className="border w-full p-3 rounded-md my-3"
          placeholder="Share your detailed Experience..  what did you like what did you didnt like"
        ></textarea>
        {/* <CustomDropzone /> */}
      </div>

      <div className="px-4 py-2">
        <Button className="w-full">Submit You're Review</Button>
      </div>
    </div>
  );
};

export default ReviewModel;

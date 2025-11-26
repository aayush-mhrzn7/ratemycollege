import CustomRating from "@/components/form-components/CustomRating";
import {
  ExampleNoChips,
  ExampleWithChips,
} from "@/components/internal/CollegeCardCompound";
import CustomDropzone from "@/components/internal/Fileupload";
import React from "react";

const page = () => {
  return (
    // <form className="h-screen flex justify-center items-center">
    //   <CustomRating />
    // </form>
    <>
      <ExampleNoChips />
      <ExampleWithChips />
    </>
  );
};

export default page;

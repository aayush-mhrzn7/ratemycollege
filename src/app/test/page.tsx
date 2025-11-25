import CustomRating from "@/components/form-components/CustomRating";
import CustomDropzone from "@/components/internal/Fileupload";
import React from "react";

const page = () => {
  return (
    <form className="h-screen flex justify-center items-center">
      <CustomRating />
    </form>
  );
};

export default page;

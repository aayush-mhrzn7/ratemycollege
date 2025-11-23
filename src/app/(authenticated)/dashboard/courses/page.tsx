import { getAffiliations } from "@/data/affiliations/affiliation";
import { getCourses } from "@/data/course/course";
import React from "react";
import { createCourse } from "./actions";

const page = async () => {
  const course = await getCourses({});
  console.log(course);
  return <div>page</div>;
};

export default page;

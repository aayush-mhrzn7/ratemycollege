import { getCourses } from "@/data/course/course";

const page = async () => {
  const course = await getCourses({});
  console.log(course);
  return <div>page</div>;
};

export default page;

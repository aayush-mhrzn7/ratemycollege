import { Button, buttonVariants } from "@/components/ui/button";
import { getCollegeDetails } from "@/data/college/college";
import { ApiResponse, CollegeDetail, CourseDetail } from "@/utils/type";
import { Pen, Star } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseTab, OverviewTab, ReviewTab } from "./_components";
import { getCourses } from "@/data/course/course";
import Link from "next/link";
const page = async () => {
  const collegeDetail = await getCollegeDetails<CollegeDetail>();
  const courseData = await getCourses<ApiResponse<CourseDetail>>();
  return (
    <>
      <section className="p-4 relative">
        <Image
          height={400}
          width={400}
          src={collegeDetail.banner_image}
          className="w-full h-[500px] rounded-2xl m-5 object-cover"
          alt={collegeDetail.slug}
        />
        <div className="absolute bottom-8 p-3 rounded-xl w-full border border-border shadow-sm flex justify-between items-center bg-background">
          <div className="flex gap-2 items-center">
            <Image
              src={collegeDetail.dp_image}
              alt={collegeDetail.name}
              width={300}
              height={300}
              className="size-[100px] object-contain"
            />
            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold text-pretty">
                {collegeDetail.name}
              </h1>
              <span>{collegeDetail.address}</span>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <Star key={index} />
              ))}
              4 (150 reviews)
            </span>
            <Link
              href={"1/review"}
              className={buttonVariants({
                className: "font-semibold",
              })}
            >
              Write a Review for swastik college
              <Pen />
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full">
        <Tabs defaultValue="overview">
          <TabsList className="my-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="w-full">
            <OverviewTab data={collegeDetail} />
          </TabsContent>
          <TabsContent className="" value="programs">
            <CourseTab data={courseData} />
          </TabsContent>
          <TabsContent value="reviews" className="w-full">
            <div className="flex flex-col">
              <ReviewTab data={collegeDetail} />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default page;

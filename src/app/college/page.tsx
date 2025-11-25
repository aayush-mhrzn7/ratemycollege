import CollegeCard from "@/components/internal/CollegeCard";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import { getCollege } from "@/data/college/college";
import { ApiResponse, College } from "@/utils/type";
import React, { Suspense } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { GraduationCap, MapPin, School, Star, X } from "lucide-react";
import createReview from "./[slug]/actions";
import CustomPagination from "@/components/internal/CustomPagination";
const page = async () => {
  const collegesData = await getCollege<ApiResponse<College>>({});
  const formData = new FormData();
  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black">Colleges</h1>
            <span>sort and apply the filtes for the colleges</span>
          </div>
          <div>
            <Select defaultValue="asdqsad"></Select>
          </div>
        </div>
        <div className="flex  gap-2 items-center my-7">
          <span className="font-bold">Active Filters:</span>
          <Badge className="flex gap-2 items-center">
            Bsc CSIT <X />
          </Badge>
          <Badge className="flex gap-2 items-center" variant={"secondary"}>
            clear all <X />
          </Badge>
        </div>
      </section>
      <div className="flex gap-6 my-10 relative justify-center">
        <aside className="w-[400px] bg-background sticky top-32 h-fit rounded-2xl p-3 md:p-10">
          <h3 className="text-2xl font-black">Filter College</h3>
          <p>Find youre perfect college</p>
          <div>
            <Accordion
              type="single"
              collapsible
              className="flex gap-4 flex-col"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <span className="flex gap-2 items-center">
                    {" "}
                    <GraduationCap />
                    Program
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <span className="flex gap-2 items-center">
                    {" "}
                    <MapPin />
                    Locations
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <span className="flex gap-2 items-center">
                    {" "}
                    <School />
                    Affiliation
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <span className="flex gap-2 items-center">
                    <Star />
                    Rating
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </aside>
        <section className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 ">
            <Suspense>
              {collegesData.results.map((college) => (
                <CollegeCard
                  slug={college.slug}
                  key={college.slug}
                  address={college.address}
                  collegeName={college.name}
                  image={college.banner_image}
                  viewChips={true}
                  affiliated={college.affiliated}
                />
              ))}
            </Suspense>
          </div>
          {/* @ts-ignore */}
          <CustomPagination
            currentPage={1}
            // onPageChange={() => {}}
            totalPages={Math.ceil(collegesData.count / 10)}
          />
        </section>
      </div>
    </>
  );
};

export default page;

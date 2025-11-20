import CollegeCard from "@/components/internal/CollegeCard";
import InformationCard from "@/components/internal/InformationCard";
import ReviewCard from "@/components/internal/ReviewCard";
import Testimonials from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCollege, getInformations } from "@/data/college/college";
import { CollegeApiResponse, InformationApiResponse } from "@/utils/type";
import {
  Eye,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  ThumbsUp,
  Users,
} from "lucide-react";
import { Suspense } from "react";
import Marquee from "react-fast-marquee";
const page = async () => {
  const res = await getCollege<CollegeApiResponse>();
  const informationResponse = await getInformations<InformationApiResponse>();
  const tags = [
    "Bsc. CSIT",
    "BCA",
    "MBA",
    "BBA",
    "Arts",
    "Psychology",
    "All Programs",
  ];

  const whyChooseUs = [
    {
      title: "Verified & Reliable Data",
      description:
        "All college information is sourced from verified databases, official portals, and publicly available trusted records. We ensure accurate details on programs, fees, affiliation, and infrastructure so students never have to rely on rumors or outdated information.",
      icon: <ShieldCheck className="w-8 h-8" />,
    },
    {
      title: "Student-Driven Ratings",
      description:
        "Our platform is powered by genuine student voices. Every review comes from real students and alumni who share their actual experiences—helping others understand the strengths, challenges, and campus life of each college.",
      icon: <Users className="w-8 h-8" />,
    },

    {
      title: "Easy Comparison",
      description:
        "Compare multiple colleges side-by-side based on ratings, programs, fees, location, and student feedback. Our simplified comparison tool helps you quickly identify which college fits your needs best.",
      icon: <SlidersHorizontal className="w-8 h-8" />,
    },
  ];

  return (
    <>
      <section className="h-[60dvh] flex justify-center items-center">
        <div className="flex justify-center items-center flex-col">
          <h1 className="text-5xl font-extrabold my-4">
            Find Your Perfect College in Nepal
          </h1>
          <p className="text-center text-muted-foreground max-w-[700px] mb-2 text-xl w-full text-wrap">
            Discover, compare and review colleges across the nation with
            authentic feedback from students
          </p>
          <search className="w-[700px] my-2 flex gap-2 items-center outline-none ring-0 p-4 rounded-lg border">
            <Search />
            <Input
              placeholder="Search by colleges, programs or locations ....."
              className="border-none shadow-none text-xl"
            />
            <Button>Search</Button>
          </search>
        </div>
      </section>
      <section className="my-28 ">
        <div className="flex mb-16 justify-center items-center w-full">
          <div className="max-w-[400px] flex gap-2 items-center">
            {tags.map((tag_item) => (
              <Button
                key={tag_item}
                variant={"outline"}
                className="rounded-full"
              >
                {tag_item}
              </Button>
            ))}
          </div>
        </div>
        <h2 className="text-3xl mb-10 font-bold text-center my-5">
          Top Rated Colleges
        </h2>
        <div className="flex  overflow-auto gap-7 items-center ">
          <Suspense>
            {res.results.map((college) => (
              <CollegeCard
                key={college.slug}
                address={college.address}
                collegeName={college.name}
                image={college.banner_image}
              />
            ))}
          </Suspense>
        </div>
      </section>
      <section className="my-28">
        <Testimonials />
      </section>
      <section className="my-28 ">
        <h2 className="text-3xl mb-10 font-bold text-center my-5">
          Latest Information and News
        </h2>
        <div className="flex  overflow-auto gap-7 items-center ">
          <Suspense>
            {informationResponse.results.map((information) => (
              <InformationCard
                key={information.slug}
                image={information.featured_image}
                information_name={information.title}
              />
            ))}
          </Suspense>
        </div>
      </section>
      <section className="my-28">
        <h2 className="text-3xl mb-10 font-bold text-center my-5">
          Why Choose Us
        </h2>
        <div className="flex gap-10 items-center">
          {" "}
          {whyChooseUs.map((item, i) => (
            <ReviewCard
              key={i}
              title={item.title}
              description={item.description}
              icon={item.icon}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;

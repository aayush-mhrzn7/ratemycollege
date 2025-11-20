import Testimonials, {
  SecondaryTestimonialList,
  TestimonialList,
} from "@/components/testimonials";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollegeDetail, CourseDetail } from "@/utils/type";
import { Building, Car, Clock, Earth, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const OverviewTab = ({ data }: { data: CollegeDetail }) => {
  return (
    <section className="flex gap-10 text-primary w-full">
      <article className="flex-1 flex flex-col items-start justify-start gap-10 w-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">About {data.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription
              className="prose-xl text-black text-[20px]"
              dangerouslySetInnerHTML={{ __html: data.about }}
            ></CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Key Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <ul className="text-[20px] list-disc text-black">
                <li className="flex gap-2 items-center my-2">
                  Quality Education: Renowned for its focus on research,
                  innovation, and practical learning experiences.
                </li>
                <li className="flex gap-2 items-center my-2">
                  Beautiful Campus: Located in the serene hills of Dhulikhel,
                  providing an ideal environment for learning and growth.
                </li>
                <li className="flex gap-2 items-center my-2">
                  Experienced Faculty: A team of highly qualified and dedicated
                  professors with international exposure.
                </li>
                <li className="flex gap-2 items-center my-2">
                  Global Collaborations: Strong partnerships with universities
                  and institutions worldwide for exchange programs and research.
                </li>
              </ul>
            </CardDescription>
          </CardContent>
        </Card>
      </article>
      <aside>
        <Card>
          <CardContent>
            <CardTitle className="my-3 text-xl">Contact Details</CardTitle>
            <ul className="text-[18px] text-black">
              <li className="flex gap-2 items-center my-2">
                <MapPin className="size-4" />
                {data.address}
              </li>
              <li className="flex gap-2 items-center my-2">
                {" "}
                <Phone className="size-4" />
                {data.phone_number}
              </li>
              <li className="flex gap-2 items-center my-2">
                {" "}
                <Earth className="size-4" />
                {data.website_link}
              </li>
              <li className="flex gap-2 items-center my-2">
                {" "}
                <Mail className="size-4" />
                {data.email}
              </li>
            </ul>
          </CardContent>
        </Card>
      </aside>
    </section>
  );
};
const CourseTab = ({ data }: { data: CourseDetail }) => {
  return (
    <Card>
      <CardContent>
        <CardTitle className="text-xl">{data.name}</CardTitle>
        <CardDescription className="">
          <span className="flex gap-2 items-center my-2">
            <Clock className="size-4" /> {data.duration.name}
          </span>
          <span className="flex gap-2 items-center my-2">
            <Building className="size-4" />
            {data.affiliation.name}
          </span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
const ReviewTab = ({ data }: { data: CollegeDetail }) => {
  return (
    <section className="flex gap-10">
      <div className="mt-8 flex-1 flex flex-col gap-3">
        <SecondaryTestimonialList />
      </div>
      <aside className="mt-8 flex flex-col gap-3">
        <Card>
          <CardContent>
            <CardTitle className="my-3 text-xl">Contact Details</CardTitle>
            <ul className="text-[18px] text-black">
              <li className="flex gap-2 items-center my-2">
                <MapPin className="size-4" />
                {data.address}
              </li>
              <li className="flex gap-2 items-center my-2">
                {" "}
                <Phone className="size-4" />
                {data.phone_number}
              </li>
              <li className="flex gap-2 items-center my-2">
                {" "}
                <Earth className="size-4" />
                {data.website_link}
              </li>
              <li className="flex gap-2 items-center my-2">
                {" "}
                <Mail className="size-4" />
                {data.email}
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <CardTitle className="my-3 text-xl">Review Details</CardTitle>
            <ul className="text-[18px] text-black">
              <li className="flex gap-2 w-full justify-between items-center my-2">
                5 Stars <span className="block">120 reviews</span>
              </li>
              <li className="flex gap-2 w-full justify-between items-center my-2">
                4 Stars <span className="block">12 reviews</span>
              </li>
              <li className="flex gap-2 w-full justify-between items-center my-2">
                3 Stars <span className="block">2 reviews</span>
              </li>
              <li className="flex gap-2 w-full justify-between items-center my-2">
                2 Stars <span className="block">12 reviews</span>
              </li>
              <li className="flex gap-2 w-full justify-between items-center my-2">
                1 Stars <span className="block">21 reviews</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </aside>
    </section>
  );
};
export { OverviewTab, CourseTab, ReviewTab };

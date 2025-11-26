"use client";
import { Affiliated } from "@/utils/type";
import Image from "next/image";
import React, { createContext, useContext } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

type CollgeContextType = {
  college: {
    image: string;
    collegeName: string;
    slug: string;
    address: string;
    affiliated?: {
      name: string;
      id: string;
    }[];
  };
};
const CollegeContext = createContext<CollgeContextType | undefined>(undefined);

const useCollegeContext = () => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error(
      "Accessing a Data of a Context Must be Wrapped in a Provider"
    );
  }
  return context;
};
const CollegeCardCompound = ({
  college,
  children,
}: CollgeContextType & { children: React.ReactNode }) => {
  return (
    <CollegeContext.Provider value={{ college }}>
      {children}
    </CollegeContext.Provider>
  );
};

const CollegeImage = () => {
  const { college } = useCollegeContext();
  return (
    <Image
      src={college.image}
      alt={college.collegeName}
      className="w-full h-[300px] rounded-t-xl object-cover"
      width={400}
      height={400}
    />
  );
};
const CollegeTitle = () => {
  const { college } = useCollegeContext();
  return (
    <CardTitle className="font-bold text-xl  mb-2 w-fit line-clamp-1 wrap-break-word">
      {college.collegeName}
    </CardTitle>
  );
};

const CollegeAddress = () => {
  const { college } = useCollegeContext();
  return <span className="block my-2">{college.address}</span>;
};
const CollegeRatings = () => {
  const { college } = useCollegeContext();
  return (
    <div className="flex gap-2 items-center">
      <Star className="size-3 text-yellow-500" />
      <span className="font-semibold block ">4.8 </span>(720 Reviews)
    </div>
  );
};
const CollegeChips = () => {
  const { college } = useCollegeContext();

  return (
    <div className="flex gap-2 items-center flex-wrap my-2">
      {college.affiliated?.map((uni) => (
        <Badge key={uni.id} className="text-blue-600 bg-blue-100 ">
          {uni.name}
        </Badge>
      ))}
      <Badge className="text-green-600 bg-green-100 ">Bsc CSIT</Badge>
      <Badge className="text-green-600 bg-green-100 ">
        Scholarship Available
      </Badge>
    </div>
  );
};
CollegeCardCompound.CollegeImage = CollegeImage;
CollegeCardCompound.CollegeTitle = CollegeTitle;
CollegeCardCompound.CollegeAddress = CollegeAddress;
CollegeCardCompound.CollegeRatings = CollegeRatings;
CollegeCardCompound.CollegeChips = CollegeChips;
export default CollegeCardCompound;

const ExampleWithChips = () => {
  return (
    <>
      <Link href={"/college/"}>
        <CollegeCardCompound
          college={{
            address: "shankhamul",
            collegeName: "Aayush College",
            slug: "Aayush College",
            affiliated: [
              {
                name: "Aayush",
                id: "1",
              },
            ],
            image:
              "https://media.collegeinfonepal.com/college/banner/Bajra_International_College_Cover.jpg",
          }}
        >
          <Card className="w-full min-w-[350px]  h-full font-primary  pt-0 ">
            <CollegeCardCompound.CollegeImage />
            <CardContent>
              <CollegeCardCompound.CollegeTitle />
              <CardDescription>
                <CollegeCardCompound.CollegeAddress />
                <CollegeCardCompound.CollegeRatings />
                <CollegeCardCompound.CollegeChips />
              </CardDescription>
            </CardContent>
          </Card>
        </CollegeCardCompound>
      </Link>
    </>
  );
};
const ExampleNoChips = () => {
  return (
    <>
      <Link href={"/college/"}>
        <CollegeCardCompound
          college={{
            address: "shankhamul",
            collegeName: "Aayush College",
            slug: "Aayush College",
            affiliated: [
              {
                name: "Aayush",
                id: "1",
              },
            ],
            image:
              "https://media.collegeinfonepal.com/college/banner/Bajra_International_College_Cover.jpg",
          }}
        >
          <Card className="w-full min-w-[350px]  h-full font-primary  pt-0 ">
            <CollegeCardCompound.CollegeImage />
            <CardContent>
              <CollegeCardCompound.CollegeTitle />
              <CardDescription>
                <CollegeCardCompound.CollegeAddress />
                <CollegeCardCompound.CollegeRatings />
                {/* <CollegeCardCompound.CollegeChips /> */}
              </CardDescription>
            </CardContent>
          </Card>
        </CollegeCardCompound>
      </Link>
    </>
  );
};

export { ExampleNoChips, ExampleWithChips };

import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Search } from "lucide-react";

const ReviewCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <Card className="w-full flex flex-col justify-center items-center ">
      <div className="bg-muted flex justify-center items-center p-2 w-fit rounded-full">
        {icon}
      </div>
      <CardContent className="text-center">
        <CardTitle className="mb-2 text-xl text-bold">{title}</CardTitle>
        <CardDescription className="text-[18px]">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;

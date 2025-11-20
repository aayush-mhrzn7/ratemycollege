import { Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
const CollegeCard = ({
  image,
  collegeName,
  address,
}: {
  image: string;
  collegeName: string;
  address: string;
}) => {
  return (
    <Card className="w-full min-w-[400px]  h-full font-primary  pt-0 ">
      <Image
        src={image}
        alt={collegeName}
        className="w-[400px] h-[300px] rounded-t-xl object-cover"
        width={400}
        height={400}
      />
      <CardContent>
        <CardTitle className="font-bold text-xl  mb-2 w-fit line-clamp-1 wrap-break-word">
          {collegeName}
        </CardTitle>
        <CardDescription>
          <span className="block my-2">{address}</span>
          <div className="flex gap-2 items-center">
            <Star className="size-3 text-yellow-500" />{" "}
            <span className="font-semibold block ">4.8 </span>(720 Reviews)
          </div>
          {/* <div className="flex gap-2 items-center my-2">
            <Badge className="text-orange-600 bg-orange-100">Top Rated</Badge>
            <Badge className="text-green-600 bg-green-100 ">Bsc CSIT</Badge>
          </div> */}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CollegeCard;

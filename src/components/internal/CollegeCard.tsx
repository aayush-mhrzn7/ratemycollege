import { Star } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Affiliated, Affiliation } from "@/utils/type";
import Link from "next/link";
const CollegeCard = ({
  image,
  collegeName,
  address,
  slug,
  affiliated,
  viewChips = false,
}: {
  image: string;
  collegeName: string;
  viewChips?: boolean;
  slug: string;
  address: string;
  affiliated?: Affiliated[];
}) => {
  return (
    <Link href={"/college/" + slug}>
      <Card className="w-full min-w-[350px]  h-full font-primary  pt-0 ">
        <Image
          src={image}
          alt={collegeName}
          className="w-full h-[300px] rounded-t-xl object-cover"
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
              <Star className="size-3 text-yellow-500" />
              <span className="font-semibold block ">4.8 </span>(720 Reviews)
            </div>
            {viewChips && (
              <div className="flex gap-2 items-center flex-wrap my-2">
                {affiliated?.map((uni) => (
                  <Badge key={uni.id} className="text-blue-600 bg-blue-100 ">
                    {uni.name}
                  </Badge>
                ))}
                <Badge className="text-green-600 bg-green-100 ">Bsc CSIT</Badge>
                <Badge className="text-green-600 bg-green-100 ">
                  Scholarship Available
                </Badge>
              </div>
            )}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CollegeCard;

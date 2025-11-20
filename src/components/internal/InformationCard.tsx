import Image from "next/image";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
const InformationCard = ({
  image,
  information_name,
  description,
}: {
  image: string;
  information_name: string;
  description?: string;
}) => {
  return (
    <Card className="w-full min-w-[400px]  h-full font-primary  pt-0 ">
      <Image
        src={image}
        alt={information_name}
        className="w-[400px] h-[300px] rounded-t-xl object-cover"
        width={400}
        height={400}
      />
      <CardContent>
        <CardTitle className="font-bold text-xl  mb-2 w-fit line-clamp-1 wrap-break-word">
          {information_name}
        </CardTitle>
        <CardDescription>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam
            voluptatum, nesciunt fugit cumque voluptatem ea repudiandae harum
            debitis, illo accusamus quas libero deserunt consequuntur natus
            sequi numquam rerum modi obcaecati.
          </p>
          <span>{Date.now()}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default InformationCard;

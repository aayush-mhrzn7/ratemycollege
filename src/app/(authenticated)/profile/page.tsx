import Avatar from "@/components/internal/Avatar";
import CollegeCard from "@/components/internal/CollegeCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCollege } from "@/data/college/college";
import { ApiResponse, College } from "@/utils/type";
import { Pen } from "lucide-react";
import React, { Suspense } from "react";

const page = async () => {
  const collegesData = await getCollege<ApiResponse<College>>({});

  return (
    <div className="pt-20">
      <h1 className="text-2xl font-black my-10">My Profile</h1>
      <Card>
        <CardHeader className="flex items-center justify-start">
          <Avatar />
          <CardContent className="flex w-full justify-between items-center">
            <div>
              <CardTitle>Aayush Maharjan</CardTitle>
              <CardDescription className="mt-2">
                Bsc CSIT student at Kathford (class 2022)
              </CardDescription>
            </div>
            <Button>
              Edit Profile <Pen />
            </Button>
          </CardContent>
        </CardHeader>
      </Card>
      <Tabs defaultValue="my-reviews" className="my-10">
        <TabsList className="my-4">
          <TabsTrigger value="my-reviews">My Reviews</TabsTrigger>
          <TabsTrigger value="saved-Colleges">Saved Colleges</TabsTrigger>
        </TabsList>
        <TabsContent value="my-reviews" className="w-full">
          {(() => {
            const reviews = [
              {
                id: 1,
                college: "Kathmandu Engineering College",
                rating: 4,
                review:
                  "Great faculty, well-equipped labs and supportive senior students. Placement support could be better.",
                date: "2024-06-12",
              },
              {
                id: 2,
                college: "Pulchowk Campus",
                rating: 5,
                review:
                  "Excellent curriculum and research opportunities. Highly recommended for engineering.",
                date: "2024-05-03",
              },
              {
                id: 3,
                college: "Kathford International",
                rating: 3,
                review:
                  "Good learning environment but infrastructure needs improvement in a few departments.",
                date: "2023-11-21",
              },
            ];

            return (
              <div className="overflow-x-auto mt-4">
                <table className="w-full min-w-[600px] border-collapse">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground">
                      <th className="px-4 py-2">College</th>
                      <th className="px-4 py-2">Rating</th>
                      <th className="px-4 py-2">Review</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviews.map((r) => (
                      <tr key={r.id} className="border-t">
                        <td className="px-4 py-3 align-top font-medium">
                          {r.college}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{r.rating}</span>
                            <span className="text-yellow-500" aria-hidden>
                              {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-top max-w-[40ch] text-sm text-muted-foreground truncate">
                          {r.review}
                        </td>
                        <td className="px-4 py-3 align-top text-sm text-muted-foreground">
                          {r.date}
                        </td>
                        <td className="px-4 py-3 align-top flex gap-2">
                          <Button>Edit</Button>
                          <Button>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })()}
        </TabsContent>
        <TabsContent
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          value="saved-Colleges"
        >
          <Suspense>
            {collegesData.results.map((college) => (
              <CollegeCard
                slug={college.slug}
                key={college.slug}
                address={college.address}
                collegeName={college.name}
                image={college.banner_image}
              />
            ))}
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;

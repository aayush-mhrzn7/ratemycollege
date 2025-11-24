import { getCollege, getCollegeDetails } from "@/data/college/college";
import { ApiResponse, College } from "@/utils/type";
import React from "react";
import { createCollege } from "./actions";

const page = async () => {
  const college = await getCollege<ApiResponse<College>>({});

  const nameSlug = college.results.map((college) => ({
    name: college.name,
    slug: college.slug,
    url: college.dp_image,
  }));

  // Resolve all promises
  const withDetails = await Promise.all(
    nameSlug.map(async (college) => ({
      ...college,
      details: await getCollegeDetails({ slug: college.slug }),
    }))
  );

  console.log(withDetails.slice(0, 1));
  const blobby = await Promise.all(
    withDetails.slice(0, 1).map(async (item) => {
      const res = await fetch(item.url);
      const buff = await res.arrayBuffer();
      return {
        ...item,
        bufferDP: buff,
      };
    })
  );

  //   college.results.forEach(async (col) => {
  //     const formData = new FormData();

  //     formData.append("name", "St. Xavier College");
  //     formData.append("description", "A top-level college in Kathmandu.");
  //     formData.append("phone", "01-4110000");
  //     formData.append("website_url", "https://stx.edu.np");
  //     formData.append("slug", "st-xavier-college");
  //     formData.append("college_email", "info@stx.edu.np");
  //     formData.append("address", "Maitighar, Kathmandu");
  //     formData.append("key_points", "Great faculty, strong academic environment");
  //     formData.append("banner_url", col.banner_image);
  //     formData.append("college_logo", col.dp_image);
  //     console.log(formData);
  //     // Then pass it to your server function
  //     const createCollegeRes = await createCollege(formData);
  //   });
  return <div>page</div>;
};

export default page;

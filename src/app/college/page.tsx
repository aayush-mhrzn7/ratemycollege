// import { SelectMultiple } from "@/components/form-components/CustomSelect";
// import CollegeCard from "@/components/internal/CollegeCard";
// import { Button } from "@/components/ui/button";
// import { getCollege } from "@/data/college/college";
// import { ApiResponse, College } from "@/utils/type";
// import { Suspense } from "react";

// const page = async () => {
//   const collegesData = await getCollege<ApiResponse<College>>({ size: 100 });

//   return (
//     <section className="my-28 ">
//       <SelectMultiple
//         allOptions={collegesData.results.map((item) => ({
//           label: item.name,
//           value: item.slug,
//         }))}
//         selectedOptions={[]}
//         setSelectedOptions={() => {}}
//         placeholder="Do somehing"
//       />
//       <div className="grid grid-cols-3 gap-10 ">
//         <Suspense>
//           {collegesData.results.map((college) => (
//             <CollegeCard
//               key={college.slug}
//               address={college.address}
//               collegeName={college.name}
//               image={college.banner_image}
//             />
//           ))}
//         </Suspense>
//       </div>
//     </section>
//   );
// };

// export default page;

"use client";

import { SelectMultiple } from "@/components/form-components/CustomSelect";
import { useForm, FormProvider } from "react-hook-form";

export default function TestPage() {
  const form = useForm({
    defaultValues: {
      categories: [],
    },
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((data) => console.log(data))}
        className="p-6 max-w-lg mx-auto m-20"
      >
        <SelectMultiple
          placeholder="Select categories..."
          allOptions={[
            { label: "Engineering", value: "eng" },
            { label: "Medical", value: "medical" },
          ]}
          selectedOptions={form.watch("categories")}
          setSelectedOptions={(val) => console.log(val)}
        />

        <button type="submit" className="mt-4 p-2 bg-black text-white rounded">
          Submit
        </button>
      </form>
    </FormProvider>
  );
}

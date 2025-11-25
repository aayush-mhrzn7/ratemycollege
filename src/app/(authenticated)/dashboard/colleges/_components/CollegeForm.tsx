"use client";
import CustomFileupload from "@/components/form-components/CustomFileupload";
import CustomInput from "@/components/form-components/CustomInput";
import { SelectMultiple } from "@/components/form-components/CustomSelect";
import CustomDropzone from "@/components/internal/Fileupload";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { collegeSchema, collegeType } from "@/lib/zod-schema";
import { useCollegeForm } from "@/store/zustand.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import z from "zod";

const CollegeDetailsSchema = collegeSchema.pick({
  name: true,
  slug: true,
  college_logo: true,
  banner_url: true,
});
type CollegeDetailsType = z.infer<typeof CollegeDetailsSchema>;
const CollegeDetails = () => {
  const form = useForm<CollegeDetailsType>({
    mode: "onChange",
    resolver: zodResolver(CollegeDetailsSchema),
    defaultValues: {
      name: "",
      slug: "",
      college_logo: "",
      banner_url: "",
    },
  });
  const { setData, step, setStep } = useCollegeForm();
  console.log(form.formState.errors);
  const onSubmit = (data: CollegeDetailsType) => {
    console.log(data, "data");
    setData(data);
    setStep(2);
    console.log(step, "step");
  };
  console.log(form.watch());
  useEffect(() => {
    form.setValue("slug", form.getValues("name"));
  }, [form.getValues("name")]);
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid mb-10 grid-cols-1 w-[1200px]  md:grid-cols-2 gap-10">
        <CustomInput
          name="name"
          placeholder="Enter the name of college"
          label="College Name"
          control={form.control}
          error={form.formState.errors.name}
        />
        <CustomInput
          name="slug"
          placeholder="Enter the slug of college"
          label="College Slug"
          props={{
            readOnly: true,
            disabled: true,
          }}
          error={form.formState.errors.slug}
          control={form.control}
        />
        <CustomFileupload
          control={form.control}
          name="college_logo"
          label="College Logo"
          error={form.formState.errors.college_logo}
          isMulti={false}
        />
        <CustomFileupload
          control={form.control}
          name="banner_url"
          isMulti={false}
          label="College Banner"
          error={form.formState.errors.banner_url}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};
const collegeInformationSchema = collegeSchema.pick({
  phone: true,
  address: true,
  college_email: true,
  description: true,
  key_points: true,
  website_url: true,
});
type collegeInformationTypes = z.infer<typeof collegeInformationSchema>;
const CollegeInformation = () => {
  const form = useForm<collegeInformationTypes>({
    mode: "onChange",
    resolver: zodResolver(collegeInformationSchema),
    defaultValues: {
      phone: "",
      address: "",
      college_email: "",
      description: "",
      key_points: "",
      website_url: "",
    },
  });
  const onSubmit = (data: collegeInformationTypes) => {
    setData(data), setStep(1);
  };
  console.log(form.watch());
  const { setData, setStep } = useCollegeForm();

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 mb-10 w-[1200px] items-end md:grid-cols-2 gap-4">
        <CustomInput
          name="phone"
          placeholder="Enter the phone of college"
          label="College Phone Number"
          control={form.control}
          error={form.formState.errors.phone}
        />
        <CustomInput
          name="website_url"
          placeholder="Enter the webiste url of college"
          label="College Website Url"
          control={form.control}
          error={form.formState.errors.website_url}
        />
        <CustomInput
          name="college_email"
          placeholder="Enter the email of college"
          label="College email"
          error={form.formState.errors.college_email}
          control={form.control}
        />
        <CustomInput
          name="key_points"
          placeholder="Enter the key_points of college"
          label="College Key Points"
          control={form.control}
          error={form.formState.errors.key_points}
        />
        <CustomInput
          name="description"
          placeholder="Enter the description of college"
          label="College Description"
          control={form.control}
          error={form.formState.errors.description}
        />
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
};
const CollegeForm = () => {
  const { step } = useCollegeForm();
  return (
    <div className="h-screen max-md:my-42 md:px-4 lg:px-10 px-4 flex justify-center items-center">
      {step == 1 ? <CollegeDetails /> : <CollegeInformation />}
    </div>
  );
};

export default CollegeForm;

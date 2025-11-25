import z from "zod";

const affiliationSchema = z.object({
  name: z.string("affiliation name is required").min(1),
});

const courseSchema = z.object({
  name: z.string(),
  year: z.string(),
  affiliationId: z.number(),
});

const reviewSchema = z.object({
  academic_score: z.string().transform((val) => parseFloat(val)),
  faculty_score: z.string().transform((val) => parseFloat(val)),
  infrastructure_score: z.string().transform((val) => parseFloat(val)),
  social_score: z.string().transform((val) => parseFloat(val)),
  career_score: z.string().transform((val) => parseFloat(val)),
  experience: z.string(),
  photos: z.array(z.string()).optional(),
  college_id: z.string().transform((val) => parseInt(val, 10)),
});

const collegeRatingSchema = z.object({
  college_id: z.string().transform((val) => parseInt(val, 10)),
  rating: z.string().transform((val) => parseFloat(val).toFixed(2)),
});

const collegeSchema = z.object({
  name: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  website_url: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
  college_email: z.string().email("Invalid email").min(1, "Required"),
  address: z.string().min(1, "Required"),
  key_points: z.string().min(1, "Required"),
  banner_url: z.string().min(1, "Required"),
  college_logo: z.string().min(1, "Required"),
});
export { affiliationSchema, courseSchema, reviewSchema, collegeSchema };

type affiliationType = z.infer<typeof affiliationSchema>;
type courseType = z.infer<typeof courseSchema>;
type reviewType = z.infer<typeof reviewSchema>;
type collegeType = z.infer<typeof collegeSchema>;
export type { affiliationType, courseType, reviewType, collegeType };

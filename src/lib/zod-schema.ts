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
  name: z.string(),
  description: z.string(),
  phone: z.string(),
  website_url: z.url(),
  slug: z.string(),
  college_email: z.email(),
  address: z.string(),
  key_points: z.string(),
  banner_url: z.string(),
  college_logo: z.string(),
});
export { affiliationSchema, courseSchema, reviewSchema, collegeSchema };

type affiliationType = z.infer<typeof affiliationSchema>;
type courseType = z.infer<typeof courseSchema>;
type reviewType = z.infer<typeof reviewSchema>;
type collegeType = z.infer<typeof collegeSchema>;
export type { affiliationType, courseType, reviewType };

import z from "zod";

const affiliationSchema = z.object({
  name: z.string("affiliation name is required").min(1),
});

const courseSchema = z.object({
  name: z.string(),
  year: z.string(),
  affiliationId: z.number(),
});
export { affiliationSchema, courseSchema };

type affiliationType = z.infer<typeof affiliationSchema>;
type courseType = z.infer<typeof courseSchema>;
export type { affiliationType, courseType };

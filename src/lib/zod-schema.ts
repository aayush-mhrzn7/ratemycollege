import z from "zod";

const affiliationSchema = z.object({
  name: z.string("affiliation name is required").min(1),
});

export { affiliationSchema };

type affiliationType = z.infer<typeof affiliationSchema>;
export type { affiliationType };

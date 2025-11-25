import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    LIMIT: z.string(),
  },
  client: {
    NEXT_PUBLIC_MAX_FILE_SIZE: z.string(),
    NEXT_PUBLIC_LIMIT: z.string(),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    LIMIT: process.env.LIMIT,
    NEXT_PUBLIC_LIMIT: process.env.NEXT_PUBLIC_LIMIT,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_MAX_FILE_SIZE: process.env.NEXT_PUBLIC_MAX_FILE_SIZE,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
});

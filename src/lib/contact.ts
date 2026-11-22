import { z } from "zod";

export const contactInterests = ["Early access", "A team conversation", "Something else"] as const;

export const contactSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  interest: z.enum(contactInterests),
  message: z.string().trim().min(1, "Enter a message.").max(5000),
});

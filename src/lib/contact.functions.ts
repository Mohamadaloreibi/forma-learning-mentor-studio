import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    // Intentional public, insert-only endpoint: never return or read enquiry details.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert(data);
    // Reusing the same request ID after a lost response must not create a second enquiry.
    if (error && error.code !== "23505") {
      throw new Error("Your enquiry could not be saved. Please try again.");
    }
    return { saved: true };
  });

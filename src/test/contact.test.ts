import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact";

const enquiry = {
  id: "9c7edaf7-e560-4233-b2b2-d8f1a51c39c6",
  name: "Alex Morgan",
  email: "alex@example.com",
  message: "Please tell me about Lerafy for my team.",
};

describe("Public enquiries", () => {
  it("accepts early-access enquiries with all review fields", () => {
    expect(contactSchema.parse({ ...enquiry, interest: "Early access" })).toEqual({
      ...enquiry,
      interest: "Early access",
    });
  });
  it("accepts contact enquiries with all review fields", () => {
    expect(contactSchema.parse({ ...enquiry, interest: "A team conversation" }).interest).toBe(
      "A team conversation",
    );
    expect(contactSchema.parse({ ...enquiry, interest: "Something else" }).message).toBe(
      enquiry.message,
    );
  });
  it("rejects invalid or missing visitor details", () => {
    expect(
      contactSchema.safeParse({ ...enquiry, interest: "Early access", email: "invalid" }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...enquiry, interest: "Early access", name: " " }).success,
    ).toBe(false);
    expect(
      contactSchema.safeParse({ ...enquiry, interest: "Early access", message: " " }).success,
    ).toBe(false);
  });
});

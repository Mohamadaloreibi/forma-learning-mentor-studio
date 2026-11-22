import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/public/pages";
import { publicHead } from "@/components/public/metadata";
export const Route = createFileRoute("/contact")({
  head: () =>
    publicHead(
      "Contact — Start a conversation with Lerafy",
      "Send an early-access or team enquiry to Lerafy, the unified AI workplace for learning, mentorship, and agent creation.",
      "/contact",
      false,
    ),
  component: ContactPage,
});

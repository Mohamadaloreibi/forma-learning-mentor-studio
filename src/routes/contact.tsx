import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/public/pages";
import { publicHead } from "@/components/public/metadata";
export const Route = createFileRoute("/contact")({
  head: () =>
    publicHead(
      "Contact — Start a conversation with Lerafy",
      "Prepare an early-access or team enquiry about Lerafy. Contact delivery is not yet connected in this prototype.",
      "/contact",
      false,
    ),
  component: ContactPage,
});

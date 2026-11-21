import { createFileRoute } from "@tanstack/react-router";
import { Dashboard } from "@/components/workplace/dashboard";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forma — Your workplace, reimagined" },
      {
        name: "description",
        content:
          "A personalized workplace for practical AI learning, guidance, and your everyday agents.",
      },
      { property: "og:title", content: "Forma — Your workplace, reimagined" },
      {
        property: "og:description",
        content:
          "A personalized workplace for practical AI learning, guidance, and your everyday agents.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

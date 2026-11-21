import { createFileRoute } from "@tanstack/react-router";
import { Academy } from "@/components/workplace/academy";
export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      { title: "AI Academy — Forma" },
      {
        name: "description",
        content:
          "Build practical workplace AI skills through short lessons and hands-on fictional exercises.",
      },
      { property: "og:title", content: "AI Academy — Forma" },
      {
        property: "og:description",
        content:
          "Build practical workplace AI skills through short lessons and hands-on fictional exercises.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Academy,
});

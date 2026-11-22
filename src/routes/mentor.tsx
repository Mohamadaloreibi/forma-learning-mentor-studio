import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Mentor } from "@/components/workplace/mentor";
export const Route = createFileRoute("/mentor")({
  validateSearch: z.object({ prompt: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "AI Mentor — Lerafy" },
      {
        name: "description",
        content:
          "Explore fictional workplace guidance, practice tasks, and learn to create your first agent.",
      },
      { property: "og:title", content: "AI Mentor — Lerafy" },
      {
        property: "og:description",
        content:
          "Explore fictional workplace guidance, practice tasks, and learn to create your first agent.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});
function Page() {
  const search = Route.useSearch();
  return (
    <Mentor key={search.prompt ?? "new"} {...(search.prompt ? { prompt: search.prompt } : {})} />
  );
}

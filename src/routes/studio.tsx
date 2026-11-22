import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { Studio } from "@/components/workplace/studio";
export const Route = createFileRoute("/studio")({
  validateSearch: z.object({ agent: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Agent Studio — Lerafy" },
      {
        name: "description",
        content:
          "Describe, configure, safely test, and request review for fictional no-code AI agents.",
      },
      { property: "og:title", content: "Agent Studio — Lerafy" },
      {
        property: "og:description",
        content:
          "Describe, configure, safely test, and request review for fictional no-code AI agents.",
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
    <Studio key={search.agent ?? "new"} {...(search.agent ? { agentId: search.agent } : {})} />
  );
}

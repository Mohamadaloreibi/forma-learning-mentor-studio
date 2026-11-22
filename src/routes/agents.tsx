import { createFileRoute } from "@tanstack/react-router";
import { Agents } from "@/components/workplace/agents";
export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "My Agents — Lerafy" },
      {
        name: "description",
        content:
          "Organize your fictional workplace agents from drafts and testing to review and approval.",
      },
      { property: "og:title", content: "My Agents — Lerafy" },
      {
        property: "og:description",
        content:
          "Organize your fictional workplace agents from drafts and testing to review and approval.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Agents,
});

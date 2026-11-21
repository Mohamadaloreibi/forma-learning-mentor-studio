import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/workplace/settings";
export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Forma" },
      {
        name: "description",
        content: "Manage your Forma demo profile, learning preferences, and workspace settings.",
      },
      { property: "og:title", content: "Settings — Forma" },
      {
        property: "og:description",
        content: "Manage your Forma demo profile, learning preferences, and workspace settings.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

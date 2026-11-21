import { createFileRoute } from "@tanstack/react-router";
import { SolutionsPage } from "@/components/public/pages";
import { publicHead } from "@/components/public/metadata";
export const Route = createFileRoute("/solutions")({
  head: () =>
    publicHead(
      "Solutions — Everyday possibility with Forma",
      "Explore fictional onboarding, AI upskilling, assistant creation, and planned human-reviewed workplace workflows.",
      "/solutions",
      false,
    ),
  component: SolutionsPage,
});

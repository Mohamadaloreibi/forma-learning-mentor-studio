import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/public/pages";
import { publicHead } from "@/components/public/metadata";
export const Route = createFileRoute("/about")({
  head: () =>
    publicHead(
      "About — The philosophy behind Forma",
      "Forma explores a more human AI workplace: practical learning, thoughtful guidance, and capability with oversight.",
      "/about",
      false,
    ),
  component: AboutPage,
});

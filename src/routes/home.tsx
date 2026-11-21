import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/public/pages";
import { publicHead } from "@/components/public/metadata";
export const Route = createFileRoute("/home")({
  head: () =>
    publicHead(
      "Forma — Make room for what people can become.",
      "Learn AI, get guidance at work, and build your own AI agents in one connected Forma workspace.",
      "/home",
      true,
    ),
  component: HomePage,
});

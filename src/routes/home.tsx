import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/public/pages";
import { publicHead } from "@/components/public/metadata";
export const Route = createFileRoute("/home")({
  head: () =>
    publicHead(
      "Lerafy — Learn. Build. Grow.",
      "Empower your team to learn AI, work smarter, and build intelligent agents — all in one workspace.",
      "/home",
      true,
    ),
  component: HomePage,
});

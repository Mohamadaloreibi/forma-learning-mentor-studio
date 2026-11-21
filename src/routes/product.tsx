import { createFileRoute } from "@tanstack/react-router";
import { ProductPage } from "@/components/public/pages";
import { publicHead } from "@/components/public/metadata";
export const Route = createFileRoute("/product")({
  head: () =>
    publicHead(
      "Product — Forma’s connected AI workplace",
      "Discover how AI Academy, AI Mentor, and Agent Studio connect learning, practice, and responsible agent creation.",
      "/product",
      false,
    ),
  component: ProductPage,
});

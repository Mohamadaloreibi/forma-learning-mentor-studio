import { describe, it, expect } from "vitest";
import { initialAgents, requestReview } from "@/lib/workplace";
describe("Safe fictional agent review", () => {
  it("requires a safe test before requesting approval", () => {
    const agent = initialAgents.find((a) => a.id === "onboarding");
    if (!agent) throw new Error("Missing demo agent");
    expect(() => requestReview(agent)).toThrow("Test your agent before requesting approval.");
  });
  it("requests review without approving or deploying the agent", () => {
    const agent = initialAgents.find((a) => a.id === "email");
    if (!agent) throw new Error("Missing demo agent");
    expect(requestReview(agent).status).toBe("In review");
    expect(agent.status).toBe("Testing");
  });
});

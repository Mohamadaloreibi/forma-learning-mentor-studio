import { describe, expect, it } from "vitest";
import {
  evaluatePractice,
  strongerPrompt,
  addCompletedLesson,
  nextLessonIndex,
  totalAcademyLessons,
} from "@/lib/practice";
function met(prompt: string, id: string) {
  return evaluatePractice(prompt).criteria.find((c) => c.id === id)?.met;
}
describe("Deterministic practice criteria", () => {
  it("detects a clear task", () => {
    expect(met("Summarize the notes", "task")).toBe(true);
    expect(met("Something useful please", "task")).toBe(false);
  });
  it("detects relevant meeting context", () => {
    expect(met("Jamie will share mockups Wednesday", "context")).toBe(true);
    expect(met("Make it better", "context")).toBe(false);
  });
  it("detects an explicit output format", () => {
    expect(met("Return a table", "format")).toBe(true);
    expect(met("Give a useful result", "format")).toBe(false);
  });
  it("requires an explicit guard against invented information", () => {
    expect(met("Do not invent details", "accuracy")).toBe(true);
    expect(met("Invent missing details", "accuracy")).toBe(false);
  });
  it("requires explicit responsible information handling", () => {
    expect(met("Exclude sensitive information", "privacy")).toBe(true);
    expect(met("Include confidential customer information", "privacy")).toBe(false);
  });
  it("only completes when all five criteria are detected", () => {
    expect(evaluatePractice(strongerPrompt).complete).toBe(true);
    expect(
      evaluatePractice("Summarize the meeting notes in a table. Do not invent details.").complete,
    ).toBe(false);
  });
  it("keeps completion idempotent during retries", () => {
    expect(addCompletedLesson(["prompt-3"], "prompt-3")).toEqual(["prompt-3"]);
    expect(addCompletedLesson(["prompt-2"], "prompt-3")).toEqual(["prompt-2", "prompt-3"]);
  });
  it("resumes the first incomplete lesson", () => {
    expect(nextLessonIndex("prompt", 6, ["prompt-1", "prompt-2"])).toBe(2);
  });
  it("uses all 14 lessons in overall progress", () => {
    expect(totalAcademyLessons).toBe(14);
  });
});

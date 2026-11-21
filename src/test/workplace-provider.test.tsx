import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { WorkplaceProvider } from "@/components/workplace/provider";
import { useWorkplace } from "@/components/workplace/context";

afterEach(cleanup);
function Consumer() {
  const { profile, setProfile, completed, completeLesson } = useWorkplace();
  return (
    <>
      <output aria-label="profile">{profile.name}</output>
      <output aria-label="lessons">{completed.length}</output>
      <button onClick={() => setProfile({ ...profile, name: "Alex Jensen" })}>
        Update profile
      </button>
      <button onClick={() => completeLesson("prompt-3")}>Complete lesson</button>
    </>
  );
}
describe("Workplace shared context", () => {
  it("keeps shared data available when a consumer remounts under an existing provider", () => {
    const view = render(
      <WorkplaceProvider>
        <Consumer key="before-refresh" />
      </WorkplaceProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Update profile" }));
    fireEvent.click(screen.getByRole("button", { name: "Complete lesson" }));
    view.rerender(
      <WorkplaceProvider>
        <Consumer key="after-refresh" />
      </WorkplaceProvider>,
    );
    expect(screen.getByLabelText("profile")).toHaveTextContent("Alex Jensen");
    expect(screen.getByLabelText("lessons")).toHaveTextContent("9");
  });
});

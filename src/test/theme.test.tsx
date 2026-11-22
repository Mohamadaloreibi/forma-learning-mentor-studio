import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeProvider } from "next-themes";
import { ThemeControl } from "@/components/theme-control";

let systemDark = false;
let mediaChange: ((event: MediaQueryListEvent) => void) | undefined;
function mount() {
  return render(
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="lerafy-theme">
      <ThemeControl inline />
    </ThemeProvider>,
  );
}
beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = "";
  systemDark = false;
  mediaChange = undefined;
  vi.spyOn(window, "matchMedia").mockImplementation((query) => ({
    matches: systemDark,
    media: query,
    onchange: null,
    addListener: (listener) => {
      mediaChange = listener
        ? (event) => listener.call(window.matchMedia(query), event)
        : undefined;
    },
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
describe("Theme preferences", () => {
  it("defaults to System when there is no saved preference", async () => {
    systemDark = true;
    mount();
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "System" })).toHaveAttribute(
        "aria-pressed",
        "true",
      ),
    );
    expect(document.documentElement).toHaveClass("dark");
  });
  it("allows Light and Dark switching and saves the selected preference", async () => {
    mount();
    fireEvent.click(screen.getByRole("button", { name: "Dark" }));
    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    expect(localStorage.getItem("lerafy-theme")).toBe("dark");
    fireEvent.click(screen.getByRole("button", { name: "Light" }));
    await waitFor(() => expect(document.documentElement).toHaveClass("light"));
    expect(localStorage.getItem("lerafy-theme")).toBe("light");
  });
  it("restores a saved manual preference when mounted again", async () => {
    localStorage.setItem("lerafy-theme", "dark");
    mount();
    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    expect(screen.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true");
  });
  it("follows system preference changes only while System is selected", async () => {
    mount();
    act(() => {
      systemDark = true;
      mediaChange?.({ matches: true } as MediaQueryListEvent);
    });
    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    fireEvent.click(screen.getByRole("button", { name: "Light" }));
    act(() => {
      mediaChange?.({ matches: true } as MediaQueryListEvent);
    });
    await waitFor(() => expect(document.documentElement).toHaveClass("light"));
    fireEvent.click(screen.getByRole("button", { name: "System" }));
    await waitFor(() => expect(document.documentElement).toHaveClass("dark"));
    expect(localStorage.getItem("lerafy-theme")).toBe("system");
  });
});

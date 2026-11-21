import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Agent } from "@/lib/workplace";
import type { PracticeAttempt, LessonHandoff } from "@/lib/practice";

type ChatMessage = { role: "user" | "assistant"; text: string };
interface WorkplaceState {
  agents: Agent[];
  saveAgent: (agent: Agent) => void;
  completed: string[];
  completeLesson: (id: string) => void;
  profile: { name: string; role: string; email: string };
  setProfile: (profile: { name: string; role: string; email: string }) => void;
  preferences: { learning: boolean; notifications: boolean; team: string };
  setPreferences: (preferences: {
    learning: boolean;
    notifications: boolean;
    team: string;
  }) => void;
  messages: ChatMessage[];
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  practiceAttempts: Record<string, PracticeAttempt>;
  savePractice: (id: string, attempt: PracticeAttempt) => void;
  lessonHandoff: LessonHandoff | null;
  setLessonHandoff: (handoff: LessonHandoff | null) => void;
}

// Keep context identity outside the component refresh boundary. Both an existing
// provider and refreshed consumers must refer to this same context instance.
export const WorkplaceContext = createContext<WorkplaceState | null>(null);

export function useWorkplace() {
  const value = useContext(WorkplaceContext);
  if (!value) throw new Error("Workplace provider is missing");
  return value;
}

import { useState, type ReactNode } from "react";
import { initialAgents, type Agent } from "@/lib/workplace";
import { WorkplaceContext } from "./context";
import { addCompletedLesson, type PracticeAttempt, type LessonHandoff } from "@/lib/practice";
export function WorkplaceProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState(initialAgents);
  const [completed, setCompleted] = useState<string[]>([
    "prompt-1",
    "prompt-2",
    "safety-1",
    "safety-2",
    "safety-3",
    "productivity-1",
    "productivity-2",
    "productivity-3",
  ]);
  const [practiceAttempts, setPracticeAttempts] = useState<Record<string, PracticeAttempt>>({});
  const [lessonHandoff, setLessonHandoff] = useState<LessonHandoff | null>(null);
  const [profile, setProfile] = useState({
    name: "Alex Morgan",
    role: "Product designer",
    email: "alex@northstar.example",
  });
  const [preferences, setPreferences] = useState({
    learning: true,
    notifications: true,
    team: "Northstar Workspace",
  });
  const [messages, setMessages] = useState<
    NonNullable<React.ContextType<typeof WorkplaceContext>>["messages"]
  >([
    {
      role: "assistant",
      text: "Hi Alex, welcome back. What would you like to work on today? We can practice a workplace task, explore a new skill, or build your first agent together.",
    },
  ]);
  return (
    <WorkplaceContext.Provider
      value={{
        agents,
        saveAgent: (agent) =>
          setAgents((prev) =>
            prev.some((a) => a.id === agent.id)
              ? prev.map((a) => (a.id === agent.id ? agent : a))
              : [agent, ...prev],
          ),
        completed,
        completeLesson: (id) => setCompleted((prev) => addCompletedLesson(prev, id)),
        practiceAttempts,
        savePractice: (id, attempt) => setPracticeAttempts((prev) => ({ ...prev, [id]: attempt })),
        lessonHandoff,
        setLessonHandoff,
        profile,
        setProfile,
        preferences,
        setPreferences,
        messages,
        setMessages,
      }}
    >
      {children}
    </WorkplaceContext.Provider>
  );
}

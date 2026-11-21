import { createContext, useContext, useState, type ReactNode } from "react";
import { initialAgents, type Agent } from "@/lib/workplace";
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
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}
const WorkplaceContext = createContext<WorkplaceState | null>(null);
export function WorkplaceProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState(initialAgents);
  const [completed, setCompleted] = useState<string[]>([
    "foundations-1",
    "foundations-2",
    "foundations-3",
    "prompt-1",
    "prompt-2",
    "safety-1",
    "safety-2",
    "productivity-1",
  ]);
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
  const [messages, setMessages] = useState<ChatMessage[]>([
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
        completeLesson: (id) => setCompleted((prev) => (prev.includes(id) ? prev : [...prev, id])),
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
export function useWorkplace() {
  const value = useContext(WorkplaceContext);
  if (!value) throw new Error("Workplace provider is missing");
  return value;
}

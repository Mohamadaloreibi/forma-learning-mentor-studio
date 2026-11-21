export type AgentStatus = "Draft" | "Testing" | "In review" | "Approved";
export interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  status: AgentStatus;
  instructions: string;
  tested: boolean;
}
export const initialAgents: Agent[] = [
  {
    id: "meeting",
    name: "Meeting notes assistant",
    description: "Turn meeting notes into clear summaries and action items.",
    category: "Productivity",
    status: "Approved",
    instructions: "Summarize notes, list actions and owners. Never invent facts.",
    tested: true,
  },
  {
    id: "email",
    name: "Email drafting companion",
    description: "Thoughtful first drafts, in your own tone of voice.",
    category: "Communication",
    status: "Testing",
    instructions: "Create clear, warm email drafts. Ask when context is missing.",
    tested: true,
  },
  {
    id: "onboarding",
    name: "Onboarding guide",
    description: "A helping hand for every new beginning.",
    category: "People & culture",
    status: "Draft",
    instructions: "Guide new colleagues through fictional onboarding steps.",
    tested: false,
  },
];
export function requestReview(agent: Agent): Agent {
  if (!agent.tested) throw new Error("Test your agent before requesting approval.");
  return { ...agent, status: "In review" };
}
export function mentorReply(text: string) {
  const t = text.toLowerCase();
  if (t.includes("agent") || t.includes("build"))
    return "Let’s turn a small, repetitive task into your first agent.\n\n1. **Choose one task** — for example, summarizing a meeting.\n2. **Define the output** — a summary, decisions, and action items.\n3. **Set boundaries** — use only supplied notes and never invent details.\n4. **Test with fictional notes** before requesting approval.\n\nYou can start with the meeting notes template in Agent Studio.";
  if (t.includes("onboard") || t.includes("procedure"))
    return "In our fictional Northstar workspace, onboarding starts with three steps:\n\n1. Meet your buddy and agree on your first-week goals.\n2. Explore the team handbook and complete the AI fundamentals path.\n3. Practice one everyday task with fictional information.\n\nCompany procedures here are examples, not real workplace policy. Which step would you like to practice?";
  if (t.includes("prompt") || t.includes("email"))
    return "A useful workplace prompt has **context, a task, and a clear output**.\n\nTry this with fictional information:\n\n“Act as a project coordinator. Draft a warm update to the team about our demo launch on Friday. Include the next steps as three bullet points. Do not add facts I haven’t provided.”\n\nCheck the result for accuracy, tone, and missing context before using it.";
  return "Let’s break that down together using a fictional workplace example.\n\n**Start with the outcome:** what would a good result look like? Then add the context, any constraints, and the format you need.\n\nFor example, turn a short set of meeting notes into a summary and three next steps. You remain in control and review every output. Would you like to practice a prompt or build an agent for this task?";
}

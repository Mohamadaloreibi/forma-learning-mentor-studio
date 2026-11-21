import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Play,
  Save,
  ArrowRight,
  ShieldCheck,
  Check,
  RotateCcw,
  BookOpen as BookOpenIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { PageHeading } from "./shell";
import { useWorkplace } from "./context";
import { requestReview, type Agent } from "@/lib/workplace";
const sample =
  "Monday design meeting\nJamie: Share homepage mockups by Wednesday.\nTaylor: Review the mockups on Thursday.\nDecision: Keep the launch scope focused on the core experience.";
export function Studio({ agentId }: { agentId?: string }) {
  const { agents, saveAgent, lessonHandoff } = useWorkplace();
  const existing = agents.find((a) => a.id === agentId);
  const [id] = useState(existing?.id ?? `agent-${Date.now()}`);
  const [name, setName] = useState(existing?.name ?? "");
  const [purpose, setPurpose] = useState(existing?.description ?? "");
  const [category, setCategory] = useState(existing?.category ?? "Productivity");
  const [instructions, setInstructions] = useState(
    existing?.instructions ??
      (lessonHandoff?.prompt ||
        "Use only the information provided. Write a concise summary and list action items with owners. Never invent details. Ask for clarification when needed."),
  );
  const [input, setInput] = useState(sample);
  const [output, setOutput] = useState("");
  const [tested, setTested] = useState(existing?.tested ?? false);
  const [status, setStatus] = useState<Agent["status"]>(existing?.status ?? "Draft");
  const [notice, setNotice] = useState("");
  const navigate = useNavigate();
  const valid = !!name.trim() && !!purpose.trim() && !!instructions.trim();
  function current(): Agent {
    return { id, name, description: purpose, category, instructions, tested, status };
  }
  function edit() {
    setTested(false);
    setOutput("");
    setStatus("Draft");
    setNotice("");
  }
  return (
    <div className="content-enter">
      <PageHeading
        eyebrow="BUILD"
        title="Agent Studio"
        description="Turn a little idea into a helpful everyday companion."
        action={
          <Button
            variant="outline"
            disabled={!valid}
            onClick={() => {
              saveAgent(current());
              setNotice("Draft saved to My Agents.");
            }}
          >
            <Save />
            Save draft
          </Button>
        }
      />
      {!existing && lessonHandoff && (
        <div className="lesson-context-note">
          <BookOpenIcon />
          From AI Academy · {lessonHandoff.topic} · Your practice prompt is in Agent instructions.
        </div>
      )}
      <div className="studio-layout">
        <section className="studio-column">
          <p className="studio-step">01 · GIVE YOUR AGENT A PURPOSE</p>
          <h2>What would you like a hand with?</h2>
          <div className="form-field">
            <label htmlFor="agent-name" className="field-label">
              Agent name
            </label>
            <Input
              id="agent-name"
              placeholder="e.g. Weekly meeting assistant"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                edit();
              }}
            />
          </div>
          <div className="form-field">
            <label htmlFor="purpose" className="field-label">
              Describe your idea
            </label>
            <Textarea
              id="purpose"
              rows={3}
              placeholder="I’d like an agent that turns meeting notes into a clear summary…"
              value={purpose}
              onChange={(e) => {
                setPurpose(e.target.value);
                edit();
              }}
            />
          </div>
          <div className="form-field">
            <label className="field-label">Category</label>
            <Select
              value={category}
              onValueChange={(v) => {
                setCategory(v);
                edit();
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["Productivity", "Communication", "People & culture"].map((c) => (
                  <SelectItem value={c} key={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="studio-step mt-8">02 · SET CLEAR BOUNDARIES</p>
          <h2>Make it your own</h2>
          <div className="form-field">
            <label htmlFor="instructions" className="field-label">
              Agent instructions
            </label>
            <Textarea
              rows={5}
              id="instructions"
              value={instructions}
              onChange={(e) => {
                setInstructions(e.target.value);
                edit();
              }}
            />
            <p>Your instructions guide the agent’s purpose, tone, and limits.</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => {
              setName("Meeting notes assistant");
              setPurpose("Turn fictional meeting notes into a summary and action items.");
              edit();
            }}
          >
            Use meeting notes template <ArrowRight />
          </Button>
        </section>
        <section className="studio-column studio-panel">
          <p className="studio-step">03 · TRY IT SAFELY</p>
          <h2>A safe place to experiment</h2>
          <div className="sandbox-label">
            <ShieldCheck size={15} /> Fictional data only · No external actions
          </div>
          <label htmlFor="sample-data" className="field-label">
            Fictional sample input
          </label>
          <Textarea
            id="sample-data"
            rows={6}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              edit();
            }}
          />
          <div className="flex gap-2 mt-4">
            <Button
              disabled={!valid || !input.trim()}
              onClick={() => {
                setOutput(
                  `FICTIONAL DEMO RESULT\n\nSummary\n${input.split("\n").filter(Boolean).slice(0, 2).join(" ")}\n\nSource notes\n${input.split("\n").filter(Boolean).slice(2).join("\n")}\n\nReview required: verify every detail against the notes before using this output. This is a local sample preview, not a live AI execution.`,
                );
                setTested(true);
                setStatus("Testing");
                setNotice("Sample test complete. Your agent is ready for review.");
                saveAgent({ ...current(), tested: true, status: "Testing" });
              }}
            >
              <Play />
              Run sample test
            </Button>
            <Button
              variant="outline"
              size="icon"
              title="Reset sample"
              aria-label="Reset sample"
              onClick={() => {
                setInput(sample);
                edit();
              }}
            >
              <RotateCcw />
            </Button>
          </div>
          {output && (
            <div className="test-output" role="status">
              {output}
            </div>
          )}
          <div className="mt-8 pt-6 border-t">
            <p className="studio-step">04 · KEEP A HUMAN IN CONTROL</p>
            <h2>Ready for another pair of eyes?</h2>
            <p className="page-description mb-4">
              Test your agent before requesting a workspace review.
              <br />
              Requests in this prototype are fictional; nothing is deployed.
            </p>
            <Button
              disabled={!tested || status === "In review" || status === "Approved"}
              onClick={() => {
                const reviewed = requestReview(current());
                saveAgent(reviewed);
                setStatus(reviewed.status);
                setNotice("Approval requested. Your agent is now In review in My Agents.");
              }}
            >
              <ShieldCheck />
              {status === "In review"
                ? "Approval requested"
                : status === "Approved"
                  ? "Already approved"
                  : "Request approval"}
            </Button>
          </div>
          {notice && (
            <p className="demo-callout" role="status">
              <Check size={14} />
              {notice}
            </p>
          )}
          <Button asChild variant="link" className="mt-3">
            <Link to="/agents">
              Go to My Agents <ArrowRight />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}

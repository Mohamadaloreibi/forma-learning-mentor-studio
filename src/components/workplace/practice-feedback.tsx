import { Check, CircleDashed, ShieldCheck } from "lucide-react";
import { evaluatePractice, strongerPrompt } from "@/lib/practice";

export function PracticeFeedback({
  prompt,
  revised,
  earned,
}: {
  prompt: string;
  revised: boolean;
  earned: boolean;
}) {
  const { criteria, complete } = evaluatePractice(prompt);
  const strengths = criteria.filter((c) => c.met);
  const improvements = criteria.filter((c) => !c.met);
  return (
    <section className="practice-feedback" aria-label="Practice feedback" aria-live="polite">
      <header>
        <ShieldCheck size={17} />
        <div>
          <h3>
            {complete
              ? "A thoughtful, well-defined prompt"
              : "A useful start. Let’s make it stronger."}
          </h3>
          <p>Demo feedback · Defined phrase checks, not a live AI evaluation.</p>
        </div>
        <span className="pill">{strengths.length}/5</span>
      </header>
      <ul className="practice-criteria">
        {criteria.map((c) => (
          <li key={c.id} className={c.met ? "criterion-met" : "criterion-improve"}>
            {c.met ? <Check size={14} /> : <CircleDashed size={14} />}
            <span>{c.label}</span>
            <small>{c.met ? "Detected" : "Not detected"}</small>
          </li>
        ))}
      </ul>
      <div className="feedback-detail">
        <h4>What you did well</h4>
        <p>
          {strengths.length
            ? strengths.map((c) => c.label).join(" · ")
            : "You made a first attempt. Start by naming the task and supplying the fictional notes."}
        </p>
        <h4>What could be improved</h4>
        {improvements.length ? (
          <ul>
            {improvements.map((c) => (
              <li key={c.id}>{c.guidance}</li>
            ))}
          </ul>
        ) : (
          <p>
            All five signals were detected. Check that the wording is accurate and useful; phrase
            checks cannot judge quality or verify privacy.
          </p>
        )}
        <h4>Example of a stronger prompt</h4>
        <blockquote>{strongerPrompt}</blockquote>
      </div>
      <p className="feedback-completion" role="status">
        {revised
          ? "Your answer has changed. Try again to check the revision."
          : complete
            ? "Practice complete. Your lesson progress is updated for this demo session."
            : earned
              ? "This revision needs work. Your previously earned lesson completion is unchanged."
              : "Not marked complete yet. Revise your prompt and try again; all five criteria must be detected."}
      </p>
    </section>
  );
}

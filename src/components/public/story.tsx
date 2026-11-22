import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  MessagesSquare,
  Blocks,
  ShieldCheck,
  Send,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BrandSymbol } from "@/components/brand";
import { Button } from "@/components/ui/button";
const chapters = [
  {
    label: "A thoughtful beginning",
    title: "A new role. A thousand questions.",
    text: "Meet Alex, a fictional new team member at Northstar. Before the first project comes the first question: where do I begin?",
    module: "Your workspace",
    to: "/",
  },
  {
    label: "Learn a practical skill",
    title: "A better question changes the work.",
    text: "A short Academy lesson helps Alex turn a vague request into a useful prompt—with a clear task, context, and boundaries.",
    module: "AI Academy",
    to: "/academy",
  },
  {
    label: "Practice with guidance",
    title: "Not alone at the blank page.",
    text: "Alex brings the practice prompt to AI Mentor. The lesson travels with it, so learning becomes a conversation about the task at hand.",
    module: "AI Mentor",
    to: "/mentor",
  },
  {
    label: "Put the skill to work",
    title: "From “I could” to “I built this.”",
    text: "The meeting-notes prompt becomes instructions for an assistant. In Agent Studio, Alex names it, gives it a purpose, and defines its boundaries.",
    module: "Agent Studio",
    to: "/studio",
  },
  {
    label: "Test. Then ask a human.",
    title: "Capability, with a considered pause.",
    text: "Alex tries fictional meeting notes first. Only after a safe demo test can the assistant be sent for review. Real approval controls are planned.",
    module: "Agent Studio",
    to: "/studio",
  },
] as const;
function StoryPreview({ step }: { step: number }) {
  return (
    <div className="story-product" aria-live="polite">
      <div className="story-product-top">
        <span className="public-mini-mark">
          <BrandSymbol small />
        </span>
        <span>Northstar Workspace</span>
        <span className="public-status">Fictional demo</span>
      </div>
      <div className="story-product-body">
        <div className="story-product-eyebrow">{chapters[step]?.module}</div>
        {step === 0 ? (
          <>
            <h3>Good morning, Alex.</h3>
            <p>A little guidance. A clearer plan.</p>
            <div className="story-mentor">
              <MessagesSquare />
              <strong>Your AI Mentor</strong>
              <p>Find your first-week priorities</p>
              <span>
                Plan with Mentor <ArrowRight size={14} />
              </span>
            </div>
            <div className="story-mini-grid">
              <span>
                <BookOpen />
                Learn a skill
              </span>
              <span>
                <Blocks />
                Build an agent
              </span>
            </div>
          </>
        ) : step === 1 ? (
          <>
            <span className="story-label">AI FOUNDATIONS · LESSON 3</span>
            <h3>Writing effective prompts</h3>
            <p>Your practice prompt</p>
            <div className="story-input">
              Summarize the supplied meeting notes in three bullets. Use only the notes; flag
              missing details. Remove personal information.
            </div>
            <div className="story-feedback">
              <CheckCircle2 />
              <div>
                <strong>5 of 5 criteria met</strong>
                <p>Clear task · Context · Format · Accuracy · Privacy</p>
              </div>
            </div>
            <small>Defined criteria · Deterministic demo feedback</small>
          </>
        ) : step === 2 ? (
          <>
            <h3>A guide for the task in front of you.</h3>
            <span className="story-label">FROM AI ACADEMY · WRITING EFFECTIVE PROMPTS</span>
            <div className="story-chat user">
              How can I turn this prompt into a meeting assistant?
            </div>
            <div className="story-chat">
              <span className="public-mini-mark">
                <BrandSymbol small />
              </span>
              <p>
                Start with one useful task. Keep the supplied notes as your only source, then test
                your instructions with a fictional meeting.
              </p>
            </div>
            <div className="story-compose">
              Ask a follow-up…
              <Send size={16} />
            </div>
          </>
        ) : step === 3 ? (
          <>
            <h3>Meeting notes assistant</h3>
            <div className="story-fields">
              <label>
                Purpose<span>Turn notes into clear next steps</span>
              </label>
              <label>
                Category<span>Productivity</span>
              </label>
              <label>
                Agent instructions
                <span>
                  Summarize supplied notes in three bullets. Never invent decisions. Remove personal
                  information.
                </span>
              </label>
            </div>
            <span className="story-label">DRAFT · YOUR PRACTICE, PUT TO WORK</span>
          </>
        ) : (
          <>
            <h3>Ready for a second pair of eyes.</h3>
            <div className="story-test">
              <ShieldCheck />
              <strong>Demo test complete</strong>
              <p>Fictional input only. No connected tools.</p>
            </div>
            <div className="story-output">
              <strong>Meeting summary</strong>
              <p>
                • Review the onboarding checklist.
                <br />• Confirm next week’s project priorities.
                <br />• Owner not specified in supplied notes.
              </p>
            </div>
            <div className="story-review">
              <Check />
              Requested review <span>Demo status</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
export function ProductStory() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    const observe = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              const index = refs.current.indexOf(e.target as HTMLElement);
              if (index >= 0) setActive(index);
            }
          }
        },
        {
          rootMargin: window.innerWidth <= 720 ? "-65% 0px -5% 0px" : "-20% 0px -45% 0px",
          threshold: 0,
        },
      );
      refs.current.forEach((el) => {
        if (el) observer?.observe(el);
      });
    };
    observe();
    window.addEventListener("resize", observe);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", observe);
    };
  }, []);
  return (
    <section className="public-story" id="journey">
      <div className="public-section-heading">
        <span className="public-kicker">ONE PERSON. A WORLD OF POSSIBILITY.</span>
        <h2>
          A skill learned.
          <br />A possibility opened.
        </h2>
        <p>
          Follow Alex’s fictional first week.
          <br />
          Five small steps. One connected workplace.
        </p>
      </div>
      <div className="story-layout">
        <div className="story-visual">
          <div className="story-tabs" aria-label="Journey chapters">
            {chapters.map((c, i) => (
              <Button
                key={c.label}
                variant="ghost"
                size="icon"
                aria-label={c.label}
                aria-pressed={active === i}
                className={active === i ? "active" : ""}
                onClick={() => {
                  setActive(i);
                  refs.current[i]?.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                      ? "instant"
                      : "smooth",
                    block: window.innerWidth <= 720 ? "end" : "center",
                  });
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </Button>
            ))}
          </div>
          <StoryPreview step={active} />
          <p className="story-caption">Original product scenes · Fictional Northstar journey</p>
        </div>
        <div className="story-chapters">
          {chapters.map((c, i) => (
            <article
              key={c.label}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={active === i ? "story-chapter active" : "story-chapter"}
            >
              <span className="public-kicker">
                0{i + 1} / {c.label}
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <Button asChild variant="link" className="story-demo-link">
                <Link to={c.to}>
                  Try {c.module} <ArrowUpRightIcon />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function ArrowUpRightIcon() {
  return <ArrowRight size={16} />;
}

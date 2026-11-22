import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  MessagesSquare,
  Blocks,
  Check,
  ShieldCheck,
  Workflow,
  Copy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import workspace from "@/assets/lerafy-workspace-preview.asset.json";
import { PublicActions, PublicClosing } from "./site";
import { ProductStory } from "./story";

const parts = [
  {
    number: "01",
    name: "AI Academy",
    line: "Learn something you can use.",
    text: "Short lessons and hands-on practice. Defined feedback helps you strengthen a prompt before you put it to work.",
    icon: BookOpen,
    to: "/academy",
  },
  {
    number: "02",
    name: "AI Mentor",
    line: "Find your next step, together.",
    text: "A personal workplace guide for onboarding, learning, and everyday tasks. Bring your lesson and practice into the conversation.",
    icon: MessagesSquare,
    to: "/mentor",
  },
  {
    number: "03",
    name: "Agent Studio",
    line: "Make a little more possible.",
    text: "Turn a practical skill into a purpose-built assistant. Describe its task, try fictional input, and request a review.",
    icon: Blocks,
    to: "/studio",
  },
] as const;
export function ConnectedProduct() {
  return (
    <section className="public-connected">
      <div className="public-section-heading">
        <span className="public-kicker">NOT MORE TOOLS. MORE CONNECTION.</span>
        <h2>
          Learn it. Talk it through.
          <br />
          Make it yours.
        </h2>
      </div>
      <div className="public-product-parts">
        {parts.map((p) => (
          <article key={p.name}>
            <div className="public-part-top">
              <span>{p.number}</span>
              <p.icon size={25} />
            </div>
            <h3>{p.name}</h3>
            <h4>{p.line}</h4>
            <p>{p.text}</p>
            <Button asChild variant="link">
              <Link to={p.to}>
                Explore in the demo <ArrowUpRight />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
export function PlannedWorkflows() {
  return (
    <section className="public-planned">
      <div>
        <span className="public-badge">PLANNED · NOT AVAILABLE IN THE PROTOTYPE</span>
        <h2>
          The next chapter:
          <br />
          work that flows.
        </h2>
        <p>
          A future Workflow Studio would connect approved assistants with repeatable workplace
          processes. Human checkpoints, scoped permissions, and a visible record of what happened
          would come first.
        </p>
        <Link to="/product">
          Our product direction <ArrowRight size={16} />
        </Link>
      </div>
      <div
        className="planned-diagram"
        aria-label="Planned workflow: request, assistant draft, human review, approved action"
      >
        <span>
          <Workflow />A request comes in
        </span>
        <i />
        <span>
          <Blocks />
          An assistant prepares a draft
        </span>
        <i />
        <span>
          <ShieldCheck />A person reviews it
        </span>
        <i />
        <span>
          <Check />
          An approved action follows
        </span>
        <small>Illustrative future workflow. No automation runs today.</small>
      </div>
    </section>
  );
}
export function TrustSection() {
  return (
    <section className="public-trust">
      <div className="public-section-heading">
        <span className="public-kicker">PROGRESS, WITH PERSPECTIVE.</span>
        <h2>
          Useful AI needs
          <br />
          human judgment.
        </h2>
        <p>
          Confidence comes from knowing the boundaries.
          <br />
          Here is where Lerafy stands today—and where it is going.
        </p>
      </div>
      <div className="trust-columns">
        <div>
          <span className="public-badge">IN THE DEMO</span>
          <h3>A safe place to practice.</h3>
          <ul>
            <li>Fictional conversations and deterministic feedback</li>
            <li>Agent testing with fictional input</li>
            <li>A test-first step before requesting review</li>
            <li>Progress and drafts for the current session</li>
          </ul>
        </div>
        <div>
          <span className="public-badge planned">PLANNED FOR PRODUCTION</span>
          <h3>Oversight by design.</h3>
          <ul>
            <li>Role-based access and scoped tool permissions</li>
            <li>Human approval before real actions</li>
            <li>Audit records and workspace data policies</li>
            <li>Live model evaluation and persistent progress</li>
          </ul>
        </div>
      </div>
      <p className="trust-note">
        <ShieldCheck size={18} />
        The prototype does not enforce production security, connect external tools, or act on real
        workplace data.
      </p>
    </section>
  );
}
export function HomePage() {
  return (
    <>
      <section className="public-hero">
        <div className="public-hero-heading">
          <span className="public-kicker">LERAFY / THE CONNECTED AI WORKPLACE</span>
          <h1>
            Learn. Build.
            <br />
            <em>Grow.</em>
          </h1>
          <p>
            Empower your team to learn AI, work smarter, and build intelligent agents —
            <br className="desktop-break" /> all in one workspace.
          </p>
          <PublicActions />
        </div>
        <div className="public-hero-product">
          <div className="public-preview-label">
            <span>LESS FRICTION. MORE FORWARD.</span>
            <span>
              A look inside Lerafy <ArrowDown />
            </span>
          </div>
          <Link to="/" aria-label="Explore the Lerafy demo workspace">
            <img
              src={workspace.url}
              width="1440"
              height="1020"
              alt="Lerafy workspace showing AI Mentor, Academy practice, and personal agents"
              fetchPriority="high"
            />
          </Link>
        </div>
      </section>
      <div className="public-intro">
        <span className="public-kicker">PEOPLE FIRST. POSSIBILITY NEXT.</span>
        <p>
          The future of work isn’t just about what AI can do.
          <br />
          It’s about what people can do <em>with it.</em>
        </p>
        <span>
          A place to learn with confidence.
          <br />A guide when you need one.
          <br />A way to turn an idea into something useful.
        </span>
      </div>
      <ProductStory />
      <ConnectedProduct />
      <PlannedWorkflows />
      <TrustSection />
      <PublicClosing />
    </>
  );
}
function ArrowDown() {
  return <ArrowRight className="public-down-arrow" size={14} />;
}
export function ProductPage() {
  return (
    <>
      <section className="public-page-lead">
        <span className="public-kicker">THE PRODUCT / CONNECTED BY DESIGN</span>
        <h1>
          One workplace.
          <br />
          <em>Many ways forward.</em>
        </h1>
        <p>
          From the first question to the first useful assistant, Lerafy keeps learning, guidance,
          and creation in the same conversation.
        </p>
        <PublicActions />
      </section>
      <ConnectedProduct />
      <ProductStory />
      <PlannedWorkflows />
      <TrustSection />
      <PublicClosing />
    </>
  );
}
const solutions = [
  {
    n: "01",
    name: "Employee onboarding",
    heading: "Give the first week a clearer shape.",
    text: "A fictional new colleague maps first-week priorities with AI Mentor, practices a team update, and finds the right next learning step.",
    example: "Alex · New project coordinator",
    to: "/mentor",
    cta: "Explore AI Mentor",
  },
  {
    n: "02",
    name: "AI upskilling",
    heading: "Build confidence through doing.",
    text: "An employee learns to write effective prompts, submits a practice answer, reviews feedback, and revises it against five transparent criteria.",
    example: "Sam · Practicing meeting summaries",
    to: "/academy",
    cta: "Explore AI Academy",
  },
  {
    n: "03",
    name: "Building AI assistants",
    heading: "Turn a recurring need into a useful idea.",
    text: "A team member takes a meeting-notes prompt into Agent Studio, defines the boundaries, and tries it with a fictional transcript.",
    example: "Riley · Creating a meeting assistant",
    to: "/studio",
    cta: "Explore Agent Studio",
  },
  {
    n: "04",
    name: "Repetitive workplace processes",
    heading: "Start small. Keep people in the loop.",
    text: "A future process could prepare a weekly project digest, route it to a reviewer, and publish only after approval. Today you can prototype the assistant—not automate the process.",
    example: "Planned workflow · Human-reviewed project digest",
    to: "/product",
    cta: "See the product direction",
  },
] as const;
export function SolutionsPage() {
  return (
    <>
      <section className="public-page-lead">
        <span className="public-kicker">SOLUTIONS / EVERYDAY POSSIBILITY</span>
        <h1>
          Real work.
          <br />
          <em>A little reimagined.</em>
        </h1>
        <p>
          Four places to begin. Original fictional scenarios—not customer stories or claims of
          measured results.
        </p>
      </section>
      <section className="public-solutions">
        {solutions.map((s) => (
          <article key={s.n}>
            <div>
              <span className="public-kicker">
                {s.n} / {s.name}
              </span>
              <h2>{s.heading}</h2>
            </div>
            <div>
              <span className="solution-example">{s.example}</span>
              <p>{s.text}</p>
              <Button asChild variant="link">
                <Link to={s.to}>
                  {s.cta} <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </section>
      <PublicClosing />
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <section className="public-page-lead about-lead">
        <span className="public-kicker">ABOUT LERAFY / A PRODUCT PHILOSOPHY</span>
        <h1>
          Technology should
          <br />
          make us <em>more human.</em>
        </h1>
        <p>Not less curious. Not less capable. Not less connected.</p>
      </section>
      <section className="public-manifesto">
        <span className="public-kicker">WHAT WE BELIEVE</span>
        <div>
          <h2>
            Make space for the person,
            <br />
            not just the process.
          </h2>
          <p>
            Lerafy begins with a simple idea: people do their best work when they have room to
            learn, someone to turn to, and the confidence to try something new.
          </p>
          <p>
            AI can create that room. But another disconnected tool isn’t enough. Learning should
            lead to practice. Guidance should meet the work in front of you. A good idea should have
            a path to becoming useful.
          </p>
          <p>
            That is the workplace we are exploring: thoughtful, connected, and built around human
            possibility.
          </p>
        </div>
      </section>
      <section className="public-principles">
        <article>
          <span>01</span>
          <h3>Capability over complexity.</h3>
          <p>A practical next step matters more than another feature.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Guidance over guesswork.</h3>
          <p>Learning becomes meaningful when you can put it to work.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Judgment over autopilot.</h3>
          <p>Useful assistants need clear boundaries and human oversight.</p>
        </article>
      </section>
      <section className="public-now">
        <span className="public-badge">WHERE WE ARE TODAY</span>
        <h2>
          An ambitious direction.
          <br />
          An honest starting point.
        </h2>
        <p>
          Lerafy is an interactive product prototype. You can explore the connected workplace with
          fictional examples today. Live AI, shared organizational progress, production permissions,
          and workflow automation remain planned—not delivered promises.
        </p>
        <Button asChild variant="link">
          <Link to="/product">
            Explore the product direction <ArrowRight />
          </Link>
        </Button>
      </section>
      <PublicClosing />
    </>
  );
}
export function ContactPage() {
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [interest, setInterest] = useState("Early access");
  async function submit(e: FormEvent) {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(
        `Lerafy enquiry — ${interest}\nName: ${name}\nEmail: ${email}\n\n${message}`,
      );
      setStatus(
        "Enquiry copied. Nothing has been sent or stored. Contact delivery is not connected yet.",
      );
    } catch {
      setStatus("Copy is unavailable in this browser. Nothing has been sent or stored.");
    }
  }
  return (
    <>
      <section className="public-contact">
        <div>
          <span className="public-kicker">CONTACT / THE CONVERSATION STARTS HERE</span>
          <h1>
            What could
            <br />
            come <em>next?</em>
          </h1>
          <p>
            Interested in early access, or exploring what Lerafy could mean for your team? Prepare a
            note.
          </p>
          <div className="contact-note">
            <span className="public-badge">PREVIEW ONLY</span>
            <p>
              Contact delivery is not connected yet. This form copies your enquiry; it does not send
              it, register early access, or store your details.
            </p>
          </div>
        </div>
        <form onSubmit={submit}>
          <fieldset>
            <legend>I’m interested in</legend>
            <div className="contact-interests">
              {["Early access", "A team conversation", "Something else"].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name="interest"
                    value={value}
                    checked={interest === value}
                    onChange={() => setInterest(value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          </fieldset>
          <label htmlFor="contact-name">Your name</label>
          <Input
            id="contact-name"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Morgan"
          />
          <label htmlFor="contact-email">Work email</label>
          <Input
            id="contact-email"
            required
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
          <label htmlFor="contact-message">What’s on your mind?</label>
          <Textarea
            id="contact-message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you’re hoping to make possible."
          />
          <Button type="submit" className="public-primary">
            <Copy />
            Copy enquiry
          </Button>
          {status && (
            <p role="status" className="contact-result">
              {status}
            </p>
          )}
        </form>
      </section>
      <PublicClosing />
    </>
  );
}

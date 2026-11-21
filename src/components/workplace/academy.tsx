import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, BookOpen, ShieldCheck, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { PageHeading } from "./shell";
import { useWorkplace } from "./context";
import art from "@/assets/forma-learning.asset.json";
import { evaluatePractice, nextLessonIndex } from "@/lib/practice";
import { PracticeFeedback } from "./practice-feedback";
const paths = [
  {
    id: "prompt",
    name: "AI foundations",
    description: "Build a practical understanding of AI, and learn to ask better questions.",
    tag: "YOUR LEARNING PATH",
    lessons: [
      "What AI can (and can’t) do",
      "Context makes the difference",
      "Writing effective prompts",
      "Reviewing AI outputs",
      "Practice with a workplace task",
      "Build your first agent",
    ],
    style: "",
    icon: BookOpen,
  },
  {
    id: "safety",
    name: "Working safely with AI",
    description:
      "Keep your judgment at the center. Explore privacy, accuracy, and responsible use.",
    tag: "ESSENTIAL SKILLS",
    lessons: [
      "Protecting information",
      "Recognizing uncertainty",
      "Checking sources",
      "Keeping a human in control",
    ],
    style: "mint",
    icon: ShieldCheck,
  },
  {
    id: "productivity",
    name: "AI for everyday work",
    description: "Less time on busywork. More space for the work that matters.",
    tag: "PRACTICAL APPLICATION",
    lessons: [
      "Summarizing a meeting",
      "Drafting a thoughtful email",
      "Organizing action items",
      "Your productivity agent",
    ],
    style: "peach",
    icon: BriefcaseBusiness,
  },
];
export function Academy() {
  const { completed, completeLesson, practiceAttempts, savePractice, setLessonHandoff } =
    useWorkplace();
  const [filter, setFilter] = useState("For you");
  const [active, setActive] = useState<(typeof paths)[number] | null>(null);
  const [lesson, setLesson] = useState(2);
  const exerciseId = active ? `${active.id}-${lesson + 1}` : "";
  const attempt = practiceAttempts[exerciseId];
  const exercise = attempt?.prompt ?? "";
  const topic = active?.lessons[lesson] ?? "";
  const visiblePaths = paths.filter(
    (p) =>
      filter !== "Completed" || p.lessons.every((_, i) => completed.includes(`${p.id}-${i + 1}`)),
  );
  return (
    <div className="content-enter">
      <PageHeading
        eyebrow="LEARN"
        title="AI Academy"
        description="Practical skills. Real confidence. A little more capable, every day."
      />
      <div className="module-tabs">
        {["For you", "All learning paths", "Completed"].map((t) => (
          <Button
            key={t}
            variant={filter === t ? "secondary" : "ghost"}
            onClick={() => setFilter(t)}
          >
            {t}
          </Button>
        ))}
      </div>
      <div className="module-grid">
        {visiblePaths.map((p) => (
          <article className="learning-path" key={p.id}>
            <div className={`path-art ${p.style}`}>
              {p.id === "prompt" ? (
                <img src={art.url} alt="Blue sculptural ribbon with mint and peach shapes" />
              ) : (
                <p.icon />
              )}
            </div>
            <div className="path-content">
              <span className="mini-label">{p.tag}</span>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <div className="course-progress">
                <BookOpen size={12} />
                {p.lessons.length} short lessons{" "}
                <span className="ml-auto">
                  {p.lessons.filter((_, i) => completed.includes(`${p.id}-${i + 1}`)).length}{" "}
                  completed
                </span>
              </div>
              <progress
                className="academy-progress"
                aria-label={`${p.name} progress`}
                max={p.lessons.length}
                value={p.lessons.filter((_, i) => completed.includes(`${p.id}-${i + 1}`)).length}
              />
              <Button
                className="w-full"
                variant={p.id === "prompt" ? "default" : "outline"}
                onClick={() => {
                  setActive(p);
                  setLesson(nextLessonIndex(p.id, p.lessons.length, completed));
                }}
              >
                Continue learning <ArrowRight />
              </Button>
            </div>
          </article>
        ))}
      </div>
      {filter === "Completed" && visiblePaths.length === 0 && (
        <p className="empty-state">Finish a learning path to see it here.</p>
      )}
      <Dialog
        open={!!active}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogTitle>{active?.name}</DialogTitle>
          <DialogDescription>
            Practical learning with fictional workplace information.
          </DialogDescription>
          {active && (
            <div className="lesson-layout">
              <nav className="lesson-list">
                {active.lessons.map((l, i) => (
                  <Button
                    key={l}
                    variant={lesson === i ? "secondary" : "ghost"}
                    onClick={() => {
                      setLesson(i);
                    }}
                  >
                    {completed.includes(`${active.id}-${i + 1}`) ? (
                      <Check size={14} />
                    ) : (
                      <span>{i + 1}.</span>
                    )}
                    {l}
                  </Button>
                ))}
              </nav>
              <div className="lesson-content">
                <span className="mini-label">
                  LESSON {lesson + 1} OF {active.lessons.length} · 5 MINUTES
                </span>
                <h2>{active.lessons[lesson]}</h2>
                <p>
                  A good AI result starts with a clear task, relevant context, and a defined output.
                  Keep sensitive information out, and always review the response.
                </p>
                <div className="exercise-box">
                  <h3>Put it into practice</h3>
                  <p>
                    Fictional scenario: the design team met on Monday. Jamie will share mockups on
                    Wednesday. Taylor will review them on Thursday. Write a prompt that asks for a
                    summary and action items, without inventing details.
                  </p>
                  <label className="field-label" htmlFor="exercise">
                    Your practice prompt
                  </label>
                  <Textarea
                    id="exercise"
                    value={exercise}
                    onChange={(e) =>
                      savePractice(exerciseId, { ...attempt, prompt: e.target.value })
                    }
                    placeholder="Summarize the following fictional meeting notes…"
                  />
                  <Button
                    className="mt-4"
                    disabled={!exercise.trim()}
                    onClick={() => {
                      savePractice(exerciseId, { prompt: exercise, submittedPrompt: exercise });
                      if (evaluatePractice(exercise).complete) completeLesson(exerciseId);
                    }}
                  >
                    {attempt?.submittedPrompt ? "Try again" : "Complete practice"} <Check />
                  </Button>
                </div>
                {attempt?.submittedPrompt && (
                  <PracticeFeedback
                    prompt={attempt.submittedPrompt}
                    revised={exercise !== attempt.submittedPrompt}
                    earned={completed.includes(exerciseId)}
                  />
                )}
                {completed.includes(exerciseId) && (
                  <p className="practice-earned">
                    <Check size={14} /> Lesson completed · Revising won't remove your earned
                    progress.
                  </p>
                )}
                <div className="flex gap-3 flex-wrap">
                  {lesson < active.lessons.length - 1 && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setLesson(lesson + 1);
                      }}
                    >
                      Next lesson <ArrowRight />
                    </Button>
                  )}
                  <Button asChild variant="ghost">
                    <Link
                      to="/mentor"
                      onClick={() => setLessonHandoff({ topic, prompt: exercise })}
                    >
                      Ask AI Mentor
                    </Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link
                      to="/studio"
                      onClick={() => setLessonHandoff({ topic, prompt: exercise })}
                    >
                      Build an agent <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

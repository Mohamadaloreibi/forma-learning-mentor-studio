export type PracticeCriterionId = "task" | "context" | "format" | "accuracy" | "privacy";
export interface PracticeCriterion {
  id: PracticeCriterionId;
  label: string;
  met: boolean;
  guidance: string;
}
export interface PracticeAttempt {
  prompt: string;
  submittedPrompt?: string;
}
export interface LessonHandoff {
  topic: string;
  prompt: string;
}
export const strongerPrompt =
  "Summarize these fictional design meeting notes: the team met on Monday; Jamie will share mockups on Wednesday; Taylor will review them on Thursday. Return a short summary followed by a table of action items, owners, and deadlines. Use only the supplied notes; do not invent details, and mark missing information as unknown. Use fictional or anonymized data only; exclude sensitive personal and company information.";

// Observable phrase checks, not semantic understanding or a live AI assessment.
export function evaluatePractice(prompt: string): {
  criteria: PracticeCriterion[];
  complete: boolean;
} {
  const text = prompt.toLowerCase();
  const criteria: PracticeCriterion[] = [
    {
      id: "task",
      label: "Clear task",
      met: /\b(summarize|summarise|draft|write|create|extract|list|organize|organise|review)\b/.test(
        text,
      ),
      guidance: "Name an explicit task, such as summarize the notes or list the actions.",
    },
    {
      id: "context",
      label: "Relevant context",
      met: /\b(meeting|design team|mockups|jamie|taylor|source notes)\b/.test(text),
      guidance: "Include the fictional meeting notes, people, or dates relevant to the task.",
    },
    {
      id: "format",
      label: "Desired output format",
      met: /\b(table|bullet(s| points)?|numbered list|paragraph|json|headings)\b/.test(text),
      guidance: "Specify a format, for example a summary followed by a table of actions.",
    },
    {
      id: "accuracy",
      label: "Avoiding invented information",
      met:
        /(?:do not|don't|never|avoid)\s+(?:invent|fabricate|make up|add unsupported)|(?:use|based on)\s+only\s+(?:the\s+)?(?:supplied|provided|source)|mark\s+missing\s+information\s+as\s+unknown/.test(
          text,
        ) && !/\b(?:please invent|make up missing|invent missing)\b/.test(text),
      guidance: "Say to use only supplied information and mark missing details as unknown.",
    },
    {
      id: "privacy",
      label: "Responsible handling of sensitive information",
      met:
        /(?:fictional|anonymized|anonymised|synthetic)\s+(?:or\s+anonymized\s+)?(?:data|information)\s+only|(?:exclude|remove|omit|avoid|do not include|don't include)\s+(?:sensitive|personal|confidential)|anonymi[sz]e\s+(?:personal|sensitive|the data)/.test(
          text,
        ) &&
        !/\b(?:include|use|share)\s+(?:real sensitive|confidential customer|private customer)\b/.test(
          text,
        ),
      guidance:
        "Explicitly use fictional/anonymized data or exclude sensitive personal and company information.",
    },
  ];
  return { criteria, complete: criteria.every((criterion) => criterion.met) };
}
export function addCompletedLesson(completed: string[], id: string) {
  return completed.includes(id) ? completed : [...completed, id];
}
export function nextLessonIndex(pathId: string, count: number, completed: string[]) {
  const index = Array.from({ length: count }, (_, i) => i).find(
    (i) => !completed.includes(`${pathId}-${i + 1}`),
  );
  return index ?? 0;
}
export const totalAcademyLessons = 14;

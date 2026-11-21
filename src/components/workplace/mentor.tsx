import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUp, ArrowUpRight, ShieldCheck, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import { PageHeading, FormaMark } from "./shell";
import { useWorkplace } from "./provider";
import { mentorReply } from "@/lib/workplace";
export function Mentor({ prompt }: { prompt?: string }) {
  const { profile, messages, setMessages } = useWorkplace();
  const [text, setText] = useState(prompt ?? "");
  function send(input: string) {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "assistant", text: mentorReply(input) },
    ]);
    setText("");
  }
  return (
    <div className="content-enter">
      <PageHeading
        eyebrow="YOUR PERSONAL GUIDE"
        title="AI Mentor"
        description="A place to ask, explore, and find your next step."
        action={
          <Button
            variant="outline"
            onClick={() =>
              setMessages([
                {
                  role: "assistant",
                  text: `Hi ${profile.name.split(" ")[0]}, what would you like to practice today?`,
                },
              ])
            }
          >
            New conversation
          </Button>
        }
      />
      <div className="mentor-layout">
        <div className="chat-surface">
          <div className="chat-identity">
            <span className="mentor-mark">
              <FormaMark />
            </span>
            <div>
              <h3>Your Forma Mentor</h3>
              <p>Fictional conversation · A safe space to explore</p>
            </div>
          </div>
          <Conversation>
            <ConversationContent>
              {messages.map((m, i) => (
                <Message from={m.role} key={i}>
                  <span className="text-xs text-muted-foreground">
                    {m.role === "assistant" ? "Forma Mentor" : profile.name}
                  </span>
                  <MessageContent className={m.role === "user" ? "chat-user" : ""}>
                    <MessageResponse>{m.text}</MessageResponse>
                  </MessageContent>
                </Message>
              ))}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
          <PromptInput onSubmit={({ text: submitted }) => send(submitted)}>
            <PromptInputTextarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What would you like to work on?"
            />
            <PromptInputFooter className="justify-between">
              <span className="text-xs text-muted-foreground flex gap-1 items-center">
                <ShieldCheck size={12} /> Fictional examples only
              </span>
              <PromptInputSubmit status="ready" disabled={!text.trim()} aria-label="Send message">
                <ArrowUp size={15} />
              </PromptInputSubmit>
            </PromptInputFooter>
          </PromptInput>
          <p className="chat-disclaimer">
            Demo responses, not a live AI service. Never enter sensitive workplace information.
          </p>
        </div>
        <aside className="mentor-context">
          <h3>A good place to start</h3>
          <p>A little guidance can turn a question into a possibility.</p>
          <div className="suggested-prompts">
            {[
              "Help me write a better prompt",
              "Walk me through onboarding",
              "Guide me through my first agent",
            ].map((p) => (
              <Button
                key={p}
                variant="outline"
                className="h-auto whitespace-normal text-left justify-between text-xs py-3"
                onClick={() => send(p)}
              >
                {p}
                <ArrowUpRight />
              </Button>
            ))}
          </div>
          <div className="weekly-note">
            <h3>From idea to action</h3>
            <p>Start small. Pick one repetitive task, and build an agent to help.</p>
            <Button asChild variant="link" className="px-0 text-xs">
              <Link to="/studio">
                <Blocks />
                Open Agent Studio
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

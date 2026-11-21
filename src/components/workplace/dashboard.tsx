import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock,
  Blocks,
  Bot,
  TrendingUp,
  Check,
  ShieldCheck,
  MessagesSquare,
  Target,
  Leaf,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWorkplace } from "./context";
import { FormaMark, PageHeading } from "./shell";
import art from "@/assets/forma-learning.asset.json";
export function Dashboard() {
  const { profile, agents, completed } = useWorkplace();
  return (
    <div className="content-enter">
      <PageHeading
        eyebrow="YOUR WORKPLACE, REIMAGINED"
        title={`Good morning, ${profile.name.split(" ")[0]}.`}
        description="A little guidance. A clearer plan. More room for meaningful work."
        action={
          <span className="date-label">
            <CalendarDays size={13} /> Monday, November 23
          </span>
        }
      />
      <div className="dashboard-columns">
        <div>
          <section
            className="learning-banner workplace-mentor-banner"
            aria-labelledby="workplace-mentor-title"
          >
            <img src={art.url} alt="Frosted blue ribbon sculpture with mint and peach forms" />
            <div className="banner-content">
              <span className="mini-label">
                <FormaMark small /> YOUR AI MENTOR
              </span>
              <h2 id="workplace-mentor-title">
                A guide for your
                <br />
                working day.
              </h2>
              <p>
                Settle into your role, practice a new skill,
                <br />
                or work through the task in front of you.
              </p>
              <div>
                <Button asChild className="small-button">
                  <Link to="/mentor">
                    Ask your AI Mentor <ArrowRight />
                  </Link>
                </Button>
                <span className="banner-time">By your side, one step at a time</span>
              </div>
            </div>
          </section>
          <section className="workspace-actions-section" aria-labelledby="workspace-actions-title">
            <div className="section-heading">
              <div>
                <h2 id="workspace-actions-title">Your workspace</h2>
                <p>Learn a skill. Practice with guidance. Put it to work.</p>
              </div>
            </div>
            <div className="workspace-actions">
              <Button asChild variant="outline" className="workspace-action">
                <Link to="/academy">
                  <span className="action-icon">
                    <BookOpen />
                  </span>
                  <span>
                    <strong>Learn something new</strong>
                    <small>AI Academy · Practical skills</small>
                  </span>
                  <ArrowUpRight className="workspace-action-arrow" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="workspace-action">
                <Link to="/mentor">
                  <span className="action-icon peach">
                    <MessagesSquare />
                  </span>
                  <span>
                    <strong>Ask your AI Mentor</strong>
                    <small>Personal guidance · Daily tasks</small>
                  </span>
                  <ArrowUpRight className="workspace-action-arrow" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="workspace-action">
                <Link to="/studio">
                  <span className="action-icon mint">
                    <Blocks />
                  </span>
                  <span>
                    <strong>Build an AI agent</strong>
                    <small>Agent Studio · Your ideas in action</small>
                  </span>
                  <ArrowUpRight className="workspace-action-arrow" />
                </Link>
              </Button>
            </div>
          </section>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-top">
                Your learning progress <BookOpen />
              </div>
              <div className="stat-value">
                {Math.round((completed.length / 12) * 100)}
                <small>% complete</small>
              </div>
              <div className="stat-foot positive">
                <TrendingUp size={11} /> Moving in the right direction
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                Skills in your toolkit <Target />
              </div>
              <div className="stat-value">
                {completed.length}
                <small>skills learned</small>
              </div>
              <div className="stat-foot">2 new skills this week</div>
            </div>
            <div className="stat-card">
              <div className="stat-top">
                Your AI agents <Bot />
              </div>
              <div className="stat-value">
                {agents.length}
                <small>agents created</small>
              </div>
              <div className="stat-foot">
                <span className="text-primary">
                  {agents.filter((a) => a.status === "Approved").length} approved
                </span>{" "}
                · Ready to help you
              </div>
            </div>
          </div>
          <div className="section-heading">
            <div>
              <h2>Put your next skill to work</h2>
              <p>Better prompts today. A useful meeting assistant tomorrow.</p>
            </div>
            <Link to="/academy" className="text-link">
              View academy <ArrowUpRight />
            </Link>
          </div>
          <div className="course-card">
            <span className="course-icon">
              <BookOpen />
            </span>
            <div className="course-body">
              <div className="course-meta">
                <span className="pill">AI FOUNDATIONS</span>
                <span>Lesson 3 of 6</span>
              </div>
              <h3>Writing effective prompts</h3>
              <p>Get better results by asking better questions.</p>
              <div className="course-progress">
                <span className="progress-track">
                  <span />
                </span>
                <span>50%</span>
              </div>
            </div>
            <Button asChild variant="outline" className="small-button resume">
              <Link to="/academy">
                Resume lesson <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="guided-workplace-journey" aria-label="Learn, practice, build">
            <Button asChild variant="ghost">
              <Link to="/academy">
                <span>01</span>Learn the skill
                <BookOpen />
              </Link>
            </Button>
            <ArrowRight aria-hidden="true" />
            <Button asChild variant="ghost">
              <Link
                to="/mentor"
                search={{
                  prompt: "Help me practice writing an effective prompt for a meeting notes agent",
                }}
              >
                <span>02</span>Practice with Mentor
                <MessagesSquare />
              </Link>
            </Button>
            <ArrowRight aria-hidden="true" />
            <Button asChild variant="ghost">
              <Link to="/studio">
                <span>03</span>Build your agent
                <Blocks />
              </Link>
            </Button>
          </div>
          <div className="section-heading">
            <div>
              <h2>Your agents, at a glance</h2>
              <p>A helping hand for your everyday work.</p>
            </div>
            <Link to="/agents" className="text-link">
              View all agents <ArrowUpRight />
            </Link>
          </div>
          <table className="agents-table">
            <thead>
              <tr>
                <th>AGENT NAME</th>
                <th className="table-type">CATEGORY</th>
                <th>STATUS</th>
                <th>LAST UPDATED</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {agents.slice(0, 3).map((a, i) => (
                <tr key={a.id}>
                  <td>
                    <Link to="/studio" search={{ agent: a.id }} className="agent-name">
                      <span className={`agent-icon ${i === 1 ? "mint" : i === 2 ? "peach" : ""}`}>
                        <Bot />
                      </span>
                      {a.name}
                    </Link>
                  </td>
                  <td className="table-type">{a.category}</td>
                  <td>
                    <span className={`pill ${a.status.toLowerCase().replace(" ", "-")}`}>
                      {a.status === "Approved" && <Check size={9} />} {a.status}
                    </span>
                  </td>
                  <td className="table-type">
                    {i === 0 ? "Today" : i === 1 ? "Yesterday" : "2 days ago"}
                  </td>
                  <td>
                    <Link
                      to="/studio"
                      search={{ agent: a.id }}
                      aria-label={`Open ${a.name}`}
                      className="table-arrow"
                    >
                      <ArrowUpRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <aside className="dashboard-aside">
          <section className="today-focus" aria-labelledby="today-focus-title">
            <div className="focus-heading">
              <div>
                <span className="mini-label">YOUR NEXT STEPS</span>
                <h2 id="today-focus-title">Today's focus</h2>
              </div>
              <Target size={19} />
            </div>
            <p className="focus-intro">A thoughtful start in your Northstar role.</p>
            <ol className="focus-list">
              <li>
                <span className="focus-number">01</span>
                <div>
                  <span className="focus-category">ONBOARDING · 5 MIN</span>
                  <h3>Find your first-week priorities</h3>
                  <p>Walk through a fictional onboarding plan with your Mentor.</p>
                  <Button asChild variant="link">
                    <Link
                      to="/mentor"
                      search={{
                        prompt: "Walk me through onboarding and help me plan my first week",
                      }}
                    >
                      Plan with Mentor
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </li>
              <li>
                <span className="focus-number">02</span>
                <div>
                  <span className="focus-category">PRACTICE · 5 MIN</span>
                  <h3>Write a clearer team update</h3>
                  <p>Practice adding context, a task, and an output to your prompt.</p>
                  <Button asChild variant="link">
                    <Link
                      to="/mentor"
                      search={{
                        prompt: "Help me write a better prompt for a fictional team update email",
                      }}
                    >
                      Practice a daily task
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </li>
              <li>
                <span className="focus-number">03</span>
                <div>
                  <span className="focus-category">BUILD · 10 MIN</span>
                  <h3>Try a meeting notes assistant</h3>
                  <p>Turn your prompt into an agent and test it with fictional notes.</p>
                  <Button asChild variant="link">
                    <Link to="/studio">
                      Start in Agent Studio
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </li>
            </ol>
            <div className="focus-demo">
              <ShieldCheck size={12} /> Fictional activities · Your pace, your choice
            </div>
          </section>
          <section className="mentor-card dashboard-mentor-context">
            <div className="mentor-card-header">
              <span className="mentor-mark">
                <FormaMark />
              </span>
              <div>
                <h2>Your AI Mentor</h2>
                <p>Learning, onboarding, and everyday work.</p>
              </div>
            </div>
            <h3>
              You don’t have to figure
              <br />
              it all out on your own.
            </h3>
            <p>
              Ask a question, explore an idea, or take
              <br />
              the next step with a guide by your side.
            </p>
            <div className="suggested-prompts">
              <Link to="/mentor" search={{ prompt: "Help me write a better prompt" }}>
                “Help me write a better prompt” <ArrowUpRight />
              </Link>
              <Link to="/mentor" search={{ prompt: "What can I use AI for in my role?" }}>
                “What can I use AI for in my role?” <ArrowUpRight />
              </Link>
              <Link to="/mentor" search={{ prompt: "Guide me through my first agent" }}>
                “Guide me through my first agent” <ArrowUpRight />
              </Link>
            </div>
            <Button asChild className="small-button">
              <Link to="/mentor">
                Start a conversation <ArrowRight />
              </Link>
            </Button>
            <div className="mentor-safety">
              <ShieldCheck size={11} /> Your safe space to ask and explore
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

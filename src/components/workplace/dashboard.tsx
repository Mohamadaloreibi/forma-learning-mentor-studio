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
import { useWorkplace } from "./provider";
import { FormaMark, PageHeading } from "./shell";
import art from "@/assets/forma-learning.asset.json";
export function Dashboard() {
  const { profile, agents, completed } = useWorkplace();
  return (
    <div className="content-enter">
      <PageHeading
        eyebrow="YOUR WORKPLACE, REIMAGINED"
        title={`Good morning, ${profile.name.split(" ")[0]}.`}
        description="Small steps today. New possibilities tomorrow."
        action={
          <span className="date-label">
            <CalendarDays size={13} /> Monday, November 23
          </span>
        }
      />
      <div className="dashboard-columns">
        <div>
          <section className="learning-banner">
            <img src={art.url} alt="Frosted blue ribbon sculpture with mint and peach forms" />
            <div className="banner-content">
              <span className="mini-label">
                <span>✳</span> LEARN. BUILD. GROW.
              </span>
              <h2>
                Your next chapter
                <br />
                starts with AI.
              </h2>
              <p>
                Build the confidence to work smarter.
                <br />
                One practical skill at a time.
              </p>
              <div>
                <Button asChild className="small-button">
                  <Link to="/academy">
                    Continue learning <ArrowRight />
                  </Link>
                </Button>
                <span className="banner-time">Just 10 minutes a day</span>
              </div>
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
              <h2>Pick up where you left off</h2>
              <p>A little learning goes a long way.</p>
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
          <section className="mentor-card">
            <div className="mentor-card-header">
              <span className="mentor-mark">
                <FormaMark />
              </span>
              <div>
                <h2>Your AI Mentor</h2>
                <p>A little guidance. A lot of possibility.</p>
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
          <div>
            <h2 className="right-heading">A good next step</h2>
            <div className="next-steps">
              <div className="next-step">
                <span className="action-icon">
                  <BookOpen />
                </span>
                <div>
                  <strong>Learn something useful</strong>
                  <p>Explore AI skills that fit your role.</p>
                </div>
                <Link to="/academy" aria-label="Explore AI skills">
                  <ArrowUpRight />
                </Link>
              </div>
              <div className="next-step">
                <span className="action-icon mint">
                  <Blocks />
                </span>
                <div>
                  <strong>Build your first agent</strong>
                  <p>Turn a repetitive task into a possibility.</p>
                </div>
                <Link to="/studio" aria-label="Build your first agent">
                  <ArrowUpRight />
                </Link>
              </div>
              <div className="next-step">
                <span className="action-icon peach">
                  <MessagesSquare />
                </span>
                <div>
                  <strong>Think it through together</strong>
                  <p>Your AI Mentor is here to help.</p>
                </div>
                <Link to="/mentor" aria-label="Ask AI Mentor">
                  <ArrowUpRight />
                </Link>
              </div>
            </div>
            <div className="weekly-note">
              <div>
                <Leaf size={14} /> Progress, not perfection.
              </div>
              <p>
                You’ve learned 2 new skills this week.
                <br />
                That’s 2 more ways to make work better.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

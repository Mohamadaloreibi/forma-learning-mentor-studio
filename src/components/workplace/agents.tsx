import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bot, Plus, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeading } from "./shell";
import { useWorkplace } from "./context";
export function Agents() {
  const { agents } = useWorkplace();
  const [filter, setFilter] = useState("All agents");
  const [search, setSearch] = useState("");
  const shown = agents.filter(
    (a) =>
      (filter === "All agents" || a.status === filter) &&
      `${a.name} ${a.description}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="content-enter">
      <PageHeading
        eyebrow="GROW"
        title="My Agents"
        description="Your ideas, taking shape. A helping hand for the work ahead."
        action={
          <Button asChild>
            <Link to="/studio">
              <Plus />
              Create agent
            </Link>
          </Button>
        }
      />
      <div className="filter-row">
        <div className="module-tabs">
          {["All agents", "Draft", "Testing", "In review", "Approved"].map((t) => (
            <Button
              key={t}
              variant={t === filter ? "secondary" : "ghost"}
              onClick={() => setFilter(t)}
            >
              {t}
            </Button>
          ))}
        </div>
        <Input
          aria-label="Search agents"
          placeholder="Search your agents…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="module-grid">
        {shown.map((a, i) => (
          <article className="agent-grid-card" key={a.id}>
            <header>
              <span className={`agent-icon ${i % 3 === 1 ? "mint" : i % 3 === 2 ? "peach" : ""}`}>
                <Bot />
              </span>
              <span className={`pill ${a.status.toLowerCase().replace(" ", "-")}`}>{a.status}</span>
            </header>
            <h2>{a.name}</h2>
            <p>{a.description}</p>
            <footer>
              <span>{a.category}</span>
              <Button asChild variant="ghost" size="sm">
                <Link to="/studio" search={{ agent: a.id }}>
                  Open agent <ArrowUpRight />
                </Link>
              </Button>
            </footer>
          </article>
        ))}
      </div>
      {shown.length === 0 && <p className="empty-state">No agents match this view.</p>}
      <p className="demo-callout">Fictional workspace · Agents never execute external actions.</p>
    </div>
  );
}

import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  BookOpen,
  MessagesSquare,
  Blocks,
  Bot,
  Settings,
  ChevronDown,
  ChevronRight,
  ArrowUpRight,
  Workflow,
  FolderClosed,
  ShieldCheck,
  Award,
  ChartNoAxesCombined,
  Search,
  Bell,
  Menu,
  X,
  Command,
  Check,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BrandLogo, BrandSymbol } from "@/components/brand";
import { ThemeControl } from "@/components/theme-control";
import { useWorkplace } from "./context";
const navigation = [
  { to: "/" as const, label: "Overview", icon: LayoutDashboard },
  { to: "/academy" as const, label: "AI Academy", icon: BookOpen },
  { to: "/mentor" as const, label: "AI Mentor", icon: MessagesSquare },
  { to: "/studio" as const, label: "Agent Studio", icon: Blocks },
  { to: "/agents" as const, label: "My Agents", icon: Bot },
];
const future = [
  ["Workflow Studio", Workflow],
  ["Knowledge Hub", FolderClosed],
  ["AgentGuard", ShieldCheck],
  ["AI Skills Passport", Award],
  ["Impact Dashboard", ChartNoAxesCombined],
] as const;
export function WorkplaceShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { profile, preferences } = useWorkplace();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [notifications, setNotifications] = useState(false);
  const [coming, setComing] = useState("");
  const title =
    navigation.find((n) => n.to === pathname)?.label ??
    (pathname === "/settings" ? "Settings" : "Workspace");
  return (
    <div className="workplace">
      <aside className={`sidebar ${mobile ? "mobile-open" : ""}`}>
        <Link to="/" className="brand" onClick={() => setMobile(false)}>
          <BrandLogo dark />
        </Link>
        <div className="workspace-switch">
          <span className="workspace-avatar">N</span>
          <div>
            <strong>{preferences.team}</strong>
            <span>Team workspace</span>
          </div>
          <ChevronDown size={14} />
        </div>
        <p className="nav-caption">WORKSPACE</p>
        <nav>
          {navigation.map(({ to, label, icon: Icon }) => (
            <Button
              key={to}
              asChild
              variant="navigation"
              className={`nav-link ${pathname === to ? "active" : ""}`}
            >
              <Link to={to} onClick={() => setMobile(false)}>
                <Icon size={19} />
                <span>{label}</span>
                {label === "AI Mentor" && <span className="nav-new">NEW</span>}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="future-nav">
          <p className="nav-caption">
            WHAT’S NEXT <span>COMING SOON</span>
          </p>
          {future.map(([label, Icon]) => (
            <Button
              variant="navigation"
              className="nav-link future-link"
              key={label}
              onClick={() => setComing(label)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </Button>
          ))}
        </div>
        <div className="sidebar-bottom">
          <div className="workspace-mobile-theme">
            <ThemeControl inline />
          </div>
          <div className="journey-note">
            <span className="note-symbol">✳</span>
            <strong>
              A little progress.
              <br />A bigger possibility.
            </strong>
            <p>Learn. Build. Grow.</p>
            <Link to="/academy">
              Find your next step <ArrowUpRight size={14} />
            </Link>
          </div>
          <Button
            asChild
            variant="navigation"
            className={`nav-link ${pathname === "/settings" ? "active" : ""}`}
          >
            <Link to="/settings" onClick={() => setMobile(false)}>
              <Settings size={18} />
              Settings
            </Link>
          </Button>
          <Button
            variant="navigation"
            className="nav-link"
            onClick={() => setComing("Workspace support")}
          >
            <HelpCircle size={18} />
            Help & resources
            <ArrowUpRight size={14} className="ml-auto" />
          </Button>
          <Link to="/settings" className="sidebar-profile" onClick={() => setMobile(false)}>
            <span className="avatar">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
            </div>
            <ChevronDown size={14} />
          </Link>
        </div>
      </aside>
      {mobile && (
        <Button
          variant="ghost"
          className="mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setMobile(false)}
        />
      )}
      <div className="workspace-main">
        <header className="topbar">
          <div className="breadcrumb">
            <Button
              variant="ghost"
              size="icon"
              className="mobile-menu"
              aria-label={mobile ? "Close menu" : "Open menu"}
              onClick={() => setMobile(!mobile)}
            >
              {mobile ? <X /> : <Menu />}
            </Button>
            <span>Workspace</span>
            <ChevronRight size={13} />
            <strong>{title}</strong>
          </div>
          <div className="topbar-actions">
            <ThemeControl />
            <span className="demo-tag">
              <span />
              Demo workspace
            </span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search workspace"
              title="Search workspace"
              onClick={() => setSearch(true)}
            >
              <Search />
            </Button>
            <span className="topbar-divider" />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              title="Notifications"
              className="notification-button"
              onClick={() => setNotifications(true)}
            >
              <Bell />
              <i />
            </Button>
            <Link to="/settings" className="avatar topbar-avatar">
              {profile.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </Link>
          </div>
        </header>
        <main className="page-content">{children}</main>
        <footer className="workspace-footer">
          <span>
            <BrandSymbol small /> A little more capable, every day.
          </span>
          <span>
            Learn <i /> Build <i /> Grow
          </span>
        </footer>
      </div>
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent>
          <DialogTitle>Search your workspace</DialogTitle>
          <DialogDescription>Learning, guidance, and your agents.</DialogDescription>
          <Input
            autoFocus
            placeholder="What are you looking for?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="search-results">
            {navigation
              .filter((n) => n.label.toLowerCase().includes(query.toLowerCase()))
              .map((n) => (
                <Button asChild variant="ghost" key={n.to}>
                  <Link to={n.to} onClick={() => setSearch(false)}>
                    <n.icon />
                    {n.label}
                    <ArrowUpRight className="ml-auto" />
                  </Link>
                </Button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={notifications} onOpenChange={setNotifications}>
        <DialogContent>
          <DialogTitle>You’re making progress</DialogTitle>
          <DialogDescription>Updates from your fictional Northstar workspace.</DialogDescription>
          <div className="notification-item">
            <Check />
            <div>
              <strong>Meeting notes assistant is approved</strong>
              <p>Your demo agent is ready in My Agents.</p>
            </div>
          </div>
          <div className="notification-item">
            <BookOpen />
            <div>
              <strong>Your next lesson is ready</strong>
              <p>Continue Writing effective prompts in AI Academy.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!coming} onOpenChange={() => setComing("")}>
        <DialogContent>
          <DialogTitle>{coming}</DialogTitle>
          <DialogDescription>
            {coming === "Workspace support"
              ? "For this fictional workspace, explore the Academy or ask your AI Mentor."
              : "Coming soon to Lerafy. This module is part of the future roadmap and is not available in this prototype."}
          </DialogDescription>
          <Button onClick={() => setComing("")}>Got it</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-description">{description}</p>
      </div>
      {action}
    </div>
  );
}

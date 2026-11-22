import { Link, useLocation } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand";

const links = [
  { to: "/home", label: "Home" },
  { to: "/product", label: "Product" },
  { to: "/solutions", label: "Solutions" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;
export function PublicShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <div className="public-site">
      <header className="public-header">
        <Button asChild variant="ghost" className="public-brand">
          <Link to="/home">
            <BrandLogo />
          </Link>
        </Button>
        <nav aria-label="Public navigation" className={open ? "public-nav is-open" : "public-nav"}>
          {links.map((item) => (
            <Button
              key={item.to}
              asChild
              variant="ghost"
              className={pathname === item.to ? "selected" : ""}
            >
              <Link to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <Button asChild variant="outline" className="public-header-cta">
          <Link to="/">
            Explore Lerafy <ArrowUpRight />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="public-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </header>
      <main>{children}</main>
      <footer className="public-footer">
        <div className="public-footer-top">
          <Link to="/home" className="public-wordmark">
            <BrandLogo />
          </Link>
          <p>
            More human possibility.
            <br />
            One connected workplace.
          </p>
          <Button asChild variant="outline">
            <Link to="/contact">
              Let’s talk <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <div className="public-footer-bottom">
          <span>© {new Date().getFullYear()} Lerafy</span>
          <nav aria-label="Footer navigation">
            {links.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <span>Learn. Build. Grow.</span>
        </div>
        <p className="public-disclaimer">
          An independent product prototype. Demo people, conversations, and agent results are
          fictional. No live AI or external actions.
        </p>
      </footer>
    </div>
  );
}
export function PublicActions() {
  return (
    <div className="public-actions">
      <Button asChild className="public-primary" size="lg">
        <Link to="/">
          Explore Lerafy <ArrowUpRight />
        </Link>
      </Button>
      <Button asChild variant="ghost" size="lg" className="public-secondary">
        <Link to="/contact">
          Get Early Access <ArrowRight />
        </Link>
      </Button>
    </div>
  );
}
export function PublicClosing() {
  return (
    <section className="public-closing">
      <span className="public-kicker">A LITTLE MORE CAPABLE. EVERY DAY.</span>
      <h2>
        Let’s make room
        <br />
        for what’s next.
      </h2>
      <PublicActions />
    </section>
  );
}

import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu, Star, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b-2 border-foreground/10 backdrop-blur-md bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-mono text-sm uppercase tracking-widest">
          <Star className="h-4 w-4 fill-foreground" />
          <span>Himanshu</span>
          <span className="text-[var(--accent-orange)] font-bold">Sharma</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 rounded-full border-2 border-foreground px-2 py-1 bg-card">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: true }}
              className="px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-foreground/5"
              activeProps={{ className: "px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-foreground text-background" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link to="/about" className="hidden md:inline-flex pill-btn pill-btn-primary">
          Get in touch <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden ink-card p-2"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t-2 border-foreground/10 bg-background">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-2">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: true }}
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider hover:bg-foreground/5"
                activeProps={{ className: "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider bg-foreground text-background" }}
              >
                {n.label}
              </Link>
            ))}
            <Link to="/about" onClick={() => setOpen(false)} className="pill-btn pill-btn-primary mt-2 justify-center">
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

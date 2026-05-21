import { Link } from "@tanstack/react-router";
import { Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t-2 border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-mono text-sm uppercase tracking-widest">
            ★ The Solo <span className="text-[var(--accent-orange)] font-bold">Maker</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Building small things on the internet — and showing you how.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { Icon: Github, href: "#" },
              { Icon: Twitter, href: "#" },
              { Icon: Linkedin, href: "#" },
              { Icon: Youtube, href: "#" },
              { Icon: Mail, href: "mailto:hello@example.com" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} className="ink-card p-2.5 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest mb-4">Pages</h4>
          <ul className="space-y-2 text-sm font-mono">
            <li><Link to="/" className="hover:text-[var(--accent-orange)]">Home</Link></li>
            <li><Link to="/work" className="hover:text-[var(--accent-orange)]">Work</Link></li>
            <li><Link to="/services" className="hover:text-[var(--accent-orange)]">Services</Link></li>
            <li><Link to="/about" className="hover:text-[var(--accent-orange)]">About</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs uppercase tracking-widest mb-4">Other</h4>
          <ul className="space-y-2 text-sm font-mono">
            <li><a href="#" className="hover:text-[var(--accent-orange)]">Blog</a></li>
            <li><a href="#" className="hover:text-[var(--accent-orange)]">Resume</a></li>
            <li><a href="#" className="hover:text-[var(--accent-orange)]">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-foreground/10 py-6 text-center text-xs font-mono text-muted-foreground">
        © 2026 Your Name — Built with love and caffeine.
      </div>
    </footer>
  );
}

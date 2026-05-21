import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

const socials = [
  { Icon: Github, href: "https://github.com/Himanshunashtech" },
  { Icon: Linkedin, href: "https://linkedin.com/in/himanshu-sharma-799030247" },
  { Icon: Mail, href: "mailto:sonu.hs9557@gmail.com" },
  { Icon: Phone, href: "tel:+919540520779" },
];

export function SiteFooter() {
  return (
    <footer
      className="mt-32 border-t-2 border-foreground/10 bg-[#faf7f0]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(200,140,90,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,140,90,0.18) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-mono text-sm uppercase tracking-widest">
            ★ Himanshu <span className="text-[var(--accent-orange)] font-bold">Sharma</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Building AI-first products from Noida — and showing you how.
          </p>
          <div className="mt-6 flex gap-2">
            {socials.map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="ink-card p-2.5 hover:translate-x-[-1px] hover:translate-y-[-1px] transition-transform">
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
          <h4 className="font-mono text-xs uppercase tracking-widest mb-4">Contact</h4>
          <ul className="space-y-2 text-sm font-mono">
            <li><a href="mailto:sonu.hs9557@gmail.com" className="hover:text-[var(--accent-orange)] break-all">sonu.hs9557@gmail.com</a></li>
            <li><a href="tel:+919540520779" className="hover:text-[var(--accent-orange)]">+91 9540520779</a></li>
            <li className="text-muted-foreground">Noida, India</li>
          </ul>
        </div>
      </div>
      <div className="border-t-2 border-foreground/10 py-6 text-center text-xs font-mono text-muted-foreground">
        © 2026 Himanshu Sharma — Built with React, caffeine, and curiosity.
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useAuth } from "./AuthProvider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/topics", label: "Issues" },
  { href: "/reps", label: "Find Reps" },
  { href: "/guide", label: "Guide" },
];

export default function Header() {
  const { user, loading, logOut } = useAuth();
  const pathname = usePathname();

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link href="/" className="brand-link" aria-label="CivicVoice home">
          <span className="logo-badge" aria-hidden="true">
            <Logo className="logo-mark" />
          </span>
          <span>
            <span className="brand-name">CivicVoice</span>
            <span className="brand-tag">Your voice matters.</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive(item.href) ? "active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="nav-auth">
          {loading ? (
            <span className="muted">Loading…</span>
          ) : user ? (
            <>
              <span className="user-chip">{user.displayName || user.email || "Signed in"}</span>
              <button className="btn btn-ghost" onClick={() => logOut()}>Log out</button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary">
              Log in / Sign up
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

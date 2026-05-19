"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header({ variant = "skimstones" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className="header-logo">
        <Link href="/">
          <Image
            src={variant === "sqweezy" ? "/logo-sqweezy-long.png" : "/logo-sks-baseline.png"}
            alt={variant === "sqweezy" ? "SQWEEZY" : "SkimStones Smart Essentials"}
            width={140}
            height={48}
            style={{ objectFit: "contain", height: "48px", width: "auto" }}
            priority
          />
        </Link>
      </div>

      <button className="lang-btn" aria-label="Language">
        <Image src="/langage-choice.png" alt="" width={34} height={34} />
      </button>

      {menuOpen && (
        <nav className="mobile-nav" onClick={() => setMenuOpen(false)}>
          <Link href="/">Home</Link>
          <Link href="/sqweezy">SQWEEZY</Link>
          <Link href="/consulting-services">Services</Link>
          <Link href="/founders">Founders</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      )}
    </header>
  );
}

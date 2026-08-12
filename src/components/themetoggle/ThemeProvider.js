"use client";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return <>{children}</>;
}

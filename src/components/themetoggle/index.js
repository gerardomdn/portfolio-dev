"use client";
import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "./style.css";

const Themetoggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark";
    setTheme(saved);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <div className="theme-switch">
      <button
        className={`theme-switch__toggle ${theme === "light" ? "theme-switch--light" : ""}`}
        onClick={toggle}
        aria-label="Toggle theme"
      >
        <div className="theme-switch__circle">
          {theme === "dark" ? <FiMoon /> : <FiSun />}
        </div>
      </button>
    </div>
  );
};

export default Themetoggle;

import { useState, useEffect } from "react";

const useTailwindDarkMode = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return [theme, toggleDarkMode];
};

export default useTailwindDarkMode;

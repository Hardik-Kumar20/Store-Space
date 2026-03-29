import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState( 
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);


    return (
        <button
          className="theme-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      );
}

export default ThemeToggle;
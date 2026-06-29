import { useEffect, useState } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import {
    toggleCard,
    toggleCircle,
    toggleUpperCircle,
} from "../utils/class";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === "dark") {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`${toggleCard(isDark)} z-[1000]`}
            aria-label="Toggle theme"
        >
            <div className={toggleCircle("text-secondary")}>
                <BsMoonStarsFill />
            </div>

            <div className={toggleCircle("text-primary")}>
                <BsSunFill />
            </div>

            <div className={toggleUpperCircle(isDark)} />
        </button>
    );
};

export default ThemeToggle;
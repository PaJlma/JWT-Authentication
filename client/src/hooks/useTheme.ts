import { useState } from "react";

type Themes = "light" | "dark";

const defaultTheme = localStorage.getItem("theme") as Themes ?? "light";

document.body.setAttribute("data-theme", defaultTheme);
localStorage.setItem("theme", defaultTheme);

const useTheme = (): [ Themes, () => void ] => {
  const [ theme, setTheme ] = useState<Themes>(defaultTheme);
  
  const toggleTheme = (): void => {
    const newTheme: Themes = theme === "light" ? "dark" : "light";
    
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  }

  return [ theme, toggleTheme ];
}

export default useTheme;
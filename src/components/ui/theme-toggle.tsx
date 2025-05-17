import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";

type Theme = "light" | "dark" | "system";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  // Inicializa o tema com base na preferência salva ou no sistema
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Atualiza o tema quando ele muda
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    
    // Atualiza a classe no elemento html
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    
    // Salva a preferência no localStorage
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label={`Alternar para modo ${theme === "dark" ? "claro" : "escuro"}`}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      )}
    </Button>
  );
}

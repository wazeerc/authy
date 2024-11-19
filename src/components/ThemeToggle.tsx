import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed right-4 top-4 rounded-full p-2",
        "bg-purple-100 dark:bg-gray-800",
        "hover:bg-purple-200 dark:hover:bg-gray-700",
        "transition-colors duration-200",
      )}
    >
      {isDark ? (
        <span className="text-2xl">☀️</span>
      ) : (
        <span className="text-2xl">🌙</span>
      )}
    </button>
  );
}

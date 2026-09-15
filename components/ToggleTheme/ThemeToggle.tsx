import { useTheme } from "next-themes";

type ThemeToggleProps = {
  isLoading?: boolean;
};

function ThemeToggle(props: ThemeToggleProps) {
  const { isLoading } = props;
  const { theme, setTheme } = useTheme();

  return (
    <div className="h-8 flex items-center">
      <label htmlFor="theme-select" className="mr-2 text-sm text-primary-500">
        Wybierz motyw:
      </label>
      <select
        id="theme-select"
        value={theme ?? "system"}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded-md border p-1 dark:bg-zinc-900 dark:text-white contrast:bg-yellow-400"
        disabled={isLoading}
      >
        <option value="system">{isLoading ? "Ładowanie..." : "Systemowy"}</option>
        <option value="light">Jasny</option>
        <option value="dark">Ciemny</option>
        <option value="contrast">Kontrastowy</option>
      </select>
    </div>
  );
}

export default ThemeToggle;

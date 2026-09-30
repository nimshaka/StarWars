import { LuMonitor, LuMoon, LuSun } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";
import type { Theme } from "@/types";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Theme; label: string; icon: typeof LuSun }[] = [
  { value: "light", label: "Light", icon: LuSun },
  { value: "dark", label: "Dark", icon: LuMoon },
  { value: "system", label: "System", icon: LuMonitor },
];

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Change theme (currently ${theme})`}
        >
          {resolvedTheme === "dark" ? (
            <LuMoon className="size-[1.1rem]" />
          ) : (
            <LuSun className="size-[1.1rem]" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => setTheme(value)}
            className={cn(theme === value && "font-medium text-primary")}
          >
            <Icon aria-hidden />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

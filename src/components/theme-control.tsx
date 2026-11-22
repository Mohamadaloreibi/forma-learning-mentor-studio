import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useHydrated } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const choices = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeControl({ inline = false }: { inline?: boolean }) {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();
  const selected = hydrated ? (theme ?? "system") : "system";
  const Icon = choices.find((choice) => choice.value === selected)?.icon ?? Monitor;
  if (inline) {
    return (
      <div className="theme-options" role="group" aria-label="Appearance">
        {choices.map((choice) => (
          <Button
            key={choice.value}
            variant="ghost"
            size="sm"
            aria-pressed={selected === choice.value}
            onClick={() => setTheme(choice.value)}
          >
            <choice.icon />
            {choice.label}
          </Button>
        ))}
      </div>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Change theme"
          title={`Appearance: ${selected}`}
        >
          <Icon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={selected} onValueChange={setTheme}>
          {choices.map((choice) => (
            <DropdownMenuRadioItem key={choice.value} value={choice.value}>
              <choice.icon className="mr-2 size-4" />
              {choice.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface LauncherButtonProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClick: () => void;
  variant?: "default" | "secondary";
}

export function LauncherButton({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  variant = "default" 
}: LauncherButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      className={cn(
        "h-auto p-6 flex flex-col items-start text-left transition-smooth",
        "bg-gradient-card hover:bg-gradient-primary border-2 border-border hover:border-primary/50",
        "shadow-subtle hover:shadow-command group"
      )}
    >
      <div className="flex items-center gap-3 mb-3 w-full">
        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth">
          <Icon className="h-6 w-6 text-primary group-hover:text-primary-glow transition-smooth" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-white transition-smooth">
            {title}
          </h3>
        </div>
      </div>
      <p className="text-sm text-muted-foreground group-hover:text-white/70 transition-smooth line-clamp-2 overflow-hidden">
        {description}
      </p>
    </Button>
  );
}
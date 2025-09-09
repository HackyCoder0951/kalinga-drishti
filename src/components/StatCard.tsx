import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant: "success" | "warning" | "critical" | "primary";
  trend?: {
    direction: "up" | "down";
    percentage: number;
  };
  subtitle?: string;
}

const variantStyles = {
  success: "bg-gradient-success border-success/30 shadow-subtle",
  warning: "bg-gradient-warning border-warning/30 shadow-alert",
  critical: "bg-gradient-critical border-critical/30 shadow-critical", 
  primary: "bg-gradient-primary border-primary/30 shadow-command"
};

const iconStyles = {
  success: "text-success-foreground",
  warning: "text-warning-foreground", 
  critical: "text-destructive-foreground",
  primary: "text-primary-foreground"
};

export function StatCard({ title, value, icon: Icon, variant, trend, subtitle }: StatCardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-smooth hover:scale-105 border-2",
      variantStyles[variant]
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-white/90">{title}</CardTitle>
        <Icon className={cn("h-5 w-5", iconStyles[variant])} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        {subtitle && (
          <p className="text-sm text-white/70">{subtitle}</p>
        )}
        {trend && (
          <div className="flex items-center text-sm text-white/60 mt-2">
            <span className={cn(
              "mr-1",
              trend.direction === "up" ? "text-success" : "text-destructive"
            )}>
              {trend.direction === "up" ? "↗" : "↘"}
            </span>
            {trend.percentage}% from last hour
          </div>
        )}
      </CardContent>
    </Card>
  );
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: string;
  location: string;
  timestamp: string;
  severity: "high" | "medium" | "low";
}

interface AlertTickerProps {
  alerts: Alert[];
}

const severityStyles = {
  high: "bg-destructive text-destructive-foreground",
  medium: "bg-warning text-warning-foreground", 
  low: "bg-success text-success-foreground"
};

export function AlertTicker({ alerts }: AlertTickerProps) {
  const recentAlerts = alerts.slice(0, 5);
  
  return (
    <Card className="bg-gradient-card border-2 border-border shadow-subtle">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning animate-pulse" />
          High-Priority Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentAlerts.length === 0 ? (
          <p className="text-muted-foreground text-sm">All clear - no active alerts</p>
        ) : (
          recentAlerts.map((alert) => (
            <div 
              key={alert.id}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-smooth"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={cn("text-xs px-2 py-1", severityStyles[alert.severity])}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <span className="text-sm font-medium text-foreground">{alert.type}</span>
                </div>
                <p className="text-xs text-muted-foreground">{alert.location}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {alert.timestamp}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
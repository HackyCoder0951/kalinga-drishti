import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map as MapIcon, 
  Navigation, 
  ZoomIn, 
  ZoomOut,
  Layers,
  AlertTriangle,
  Activity
} from "lucide-react";
import { mockTrafficSignals, mockMapAlerts } from "@/data/mockData";

export default function MapView() {
  const [viewMode, setViewMode] = useState<"signals" | "alerts">("signals");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const signalColors = {
    green: "bg-success border-success/50 shadow-[0_0_20px_rgba(34,197,94,0.5)]",
    yellow: "bg-warning border-warning/50 shadow-[0_0_20px_rgba(251,191,36,0.5)]",
    red: "bg-destructive border-destructive/50 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
  };

  const alertColors = {
    high: "bg-destructive border-destructive/50 animate-pulse",
    medium: "bg-warning border-warning/50",
    low: "bg-success border-success/50"
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MapIcon className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-foreground">Live Traffic Map</h1>
          <Badge variant="outline" className="ml-2">Bhubaneshwar City</Badge>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-muted rounded-lg p-1">
            <Button
              size="sm"
              variant={viewMode === "signals" ? "default" : "ghost"}
              onClick={() => setViewMode("signals")}
              className="text-xs"
            >
              Signal Status
            </Button>
            <Button
              size="sm" 
              variant={viewMode === "alerts" ? "default" : "ghost"}
              onClick={() => setViewMode("alerts")}
              className="text-xs"
            >
              Live Alerts
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline">
              <Layers className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 relative">
        {/* Map Container */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgb(148 163 184)" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Bhubaneshwar Map Simulation */}
          <div className="absolute inset-0 p-8">
            <div className="relative w-full h-full">
              {/* Traffic Signals */}
              {viewMode === "signals" && mockTrafficSignals.map((signal, index) => (
                <div
                  key={signal.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + (index % 3) * 20}%`
                  }}
                  onClick={() => setSelectedItem(signal)}
                >
                  <div className={`w-6 h-6 rounded-full border-2 ${signalColors[signal.status]} transition-all duration-300 hover:scale-125`} />
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-foreground whitespace-nowrap bg-card/80 px-2 py-1 rounded border border-border">
                    {signal.location}
                  </div>
                </div>
              ))}

              {/* Alert Markers */}
              {viewMode === "alerts" && mockMapAlerts.map((alert, index) => (
                <div
                  key={alert.id}
                  className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${25 + index * 20}%`,
                    top: `${40 + (index % 2) * 15}%`
                  }}
                  onClick={() => setSelectedItem(alert)}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${alertColors[alert.severity]} transition-all duration-300 hover:scale-125`}>
                    <AlertTriangle className="h-4 w-4 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-foreground whitespace-nowrap bg-card/80 px-2 py-1 rounded border border-border">
                    {alert.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <Card className="absolute bottom-6 right-6 p-4 bg-card/90 backdrop-blur-sm">
            <h3 className="font-semibold text-foreground mb-3">
              {viewMode === "signals" ? "Signal Status" : "Alert Severity"}
            </h3>
            
            {viewMode === "signals" ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success border border-success/50" />
                  <span className="text-sm text-foreground">Green - Normal Flow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning border border-warning/50" />
                  <span className="text-sm text-foreground">Yellow - Caution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive border border-destructive/50" />
                  <span className="text-sm text-foreground">Red - Stop/Issue</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-destructive" />
                  <span className="text-sm text-foreground">High Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-warning" />
                  <span className="text-sm text-foreground">Medium Priority</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-3 w-3 text-success" />
                  <span className="text-sm text-foreground">Low Priority</span>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Info Panel */}
        {selectedItem && (
          <Card className="absolute top-6 left-6 p-4 bg-card/90 backdrop-blur-sm min-w-[300px]">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-foreground">
                {selectedItem.location || selectedItem.title}
              </h3>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setSelectedItem(null)}
                className="h-6 w-6 p-0"
              >
                ×
              </Button>
            </div>
            
            {selectedItem.status && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-sm">Status: </span>
                  <Badge className={selectedItem.status === 'green' ? 'bg-success' : selectedItem.status === 'yellow' ? 'bg-warning' : 'bg-destructive'}>
                    {selectedItem.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Last Updated: {new Date(selectedItem.lastUpdate).toLocaleString()}
                </p>
              </div>
            )}
            
            {selectedItem.description && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning" />
                  <span className="text-sm">Alert Details</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedItem.description}
                </p>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}